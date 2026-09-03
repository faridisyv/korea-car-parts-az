export interface InquiryData {
  id: string;
  vinCode: string;
  partNumber?: string | null;
  partName: string;
  carModel?: string | null;
  carYear?: number | null;
  quantity: number;
  details?: string | null;
  name: string;
  phone: string;
  email?: string | null;
  urgency: string;
  createdAt?: Date;
}

/**
 * Sends real-time notifications to Admin via Telegram Bot and/or Email.
 * Both are optional and fail gracefully if environment variables are not configured.
 */
export async function sendInquiryNotifications(inquiry: InquiryData) {
  await Promise.allSettled([
    sendTelegramNotification(inquiry),
    sendEmailNotification(inquiry),
  ]);
}

async function sendTelegramNotification(inquiry: InquiryData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return;
  }

  const cleanPhone = inquiry.phone.replace(/[^0-9]/g, "");
  const waLink = cleanPhone ? `https://wa.me/${cleanPhone}` : "";
  const urgencyLabel =
    inquiry.urgency === "express_air" ? "✈️ Express Air (3-7 gün)" : "📦 Standart (14-21 gün)";

  const text = `🚨 *YENİ EHTİYAT HİSSƏSİ SORĞUSU!*

👤 *Müştəri:* ${inquiry.name}
📞 *Telefon:* \`${inquiry.phone}\`
📧 *Email:* ${inquiry.email || "Qeyd edilməyib"}

🚗 *Avtomobil:* ${inquiry.carModel || "Bilinmir"} ${inquiry.carYear ? `(${inquiry.carYear})` : ""}
🔢 *VIN Kod:* \`${inquiry.vinCode}\`
⚙️ *Hissə Adı:* ${inquiry.partName}
🏷️ *OEM Kodu:* ${inquiry.partNumber || "Bilinmir"}
🔢 *Say:* ${inquiry.quantity} ədəd
⚡ *Təcililik:* ${urgencyLabel}
${inquiry.details ? `📝 *Qeyd:* _${inquiry.details}_\n` : ""}
⏰ *Tarix:* ${new Date().toLocaleString("az-AZ", { timeZone: "Asia/Baku" })}`;

  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
  };

  if (waLink) {
    body.reply_markup = {
      inline_keyboard: [
        [
          {
            text: "💬 WhatsApp ilə Əlaqə Saxla",
            url: waLink,
          },
        ],
      ],
    };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram notification failed:", err);
    }
  } catch (err) {
    console.error("Telegram network error:", err);
  }
}

async function sendEmailNotification(inquiry: InquiryData) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!resendApiKey || !adminEmail) {
    return;
  }

  const cleanPhone = inquiry.phone.replace(/[^0-9]/g, "");
  const waLink = cleanPhone ? `https://wa.me/${cleanPhone}` : "";
  const urgencyLabel =
    inquiry.urgency === "express_air" ? "Express Air (3-7 gün)" : "Standart (14-21 gün)";

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0c10; color: #ffffff; padding: 24px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #f59e0b;">
      <div style="border-bottom: 1px solid #333; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #f59e0b; margin: 0; font-size: 20px;">🚨 Yeni Ehtiyat Hissəsi Sorğusu</h2>
        <p style="color: #888; font-size: 12px; margin: 4px 0 0 0;">Korea Car Parts AZ saytından daxil oldu</p>
      </div>

      <div style="background-color: #16181f; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #fff; margin-top: 0; font-size: 15px; border-bottom: 1px solid #222; padding-bottom: 8px;">👤 Müştəri Məlumatları</h3>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Ad:</strong> ${inquiry.name}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Telefon:</strong> <a href="tel:${cleanPhone}" style="color: #f59e0b; text-decoration: none;">${inquiry.phone}</a></p>
        ${inquiry.email ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Email:</strong> ${inquiry.email}</p>` : ""}
      </div>

      <div style="background-color: #16181f; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #fff; margin-top: 0; font-size: 15px; border-bottom: 1px solid #222; padding-bottom: 8px;">🚗 Avtomobil və Hissə</h3>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Avtomobil:</strong> ${inquiry.carModel || "Bilinmir"} ${inquiry.carYear ? `(${inquiry.carYear})` : ""}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>VIN Kod:</strong> <span style="background: #252836; padding: 3px 8px; border-radius: 4px; color: #f59e0b; font-family: monospace; font-size: 15px; letter-spacing: 1px;">${inquiry.vinCode}</span></p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Hissə Adı:</strong> ${inquiry.partName}</p>
        ${inquiry.partNumber ? `<p style="margin: 6px 0; font-size: 14px;"><strong>OEM Part #:</strong> ${inquiry.partNumber}</p>` : ""}
        <p style="margin: 6px 0; font-size: 14px;"><strong>Say:</strong> ${inquiry.quantity} ədəd</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Təcililik:</strong> ${urgencyLabel}</p>
        ${inquiry.details ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Əlavə Qeydlər:</strong> ${inquiry.details}</p>` : ""}
      </div>

      ${
        waLink
          ? `
      <div style="text-align: center; margin-top: 24px;">
        <a href="${waLink}" style="background-color: #25D366; color: #000000; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block; font-size: 14px;">
          💬 WhatsApp ilə Müştəriyə Cavab Ver
        </a>
      </div>
      `
          : ""
      }
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Korea Car Parts AZ <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `🚨 Yeni Sorğu: ${inquiry.partName} (${inquiry.carModel || "Koreya Avto"}) - ${inquiry.name}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend email failed:", err);
    }
  } catch (err) {
    console.error("Resend network error:", err);
  }
}
