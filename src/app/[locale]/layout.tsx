import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RequestModal from "@/components/request/RequestModal";
import { RequestModalProvider } from "@/components/request/RequestModalContext";
import { CurrencyProvider } from "@/components/layout/CurrencyToggle";

export const metadata: Metadata = {
  title: "Korea Car Parts AZ | Genuine Hyundai & Kia Mobis Auto Parts Direct from South Korea",
  description: "Direct OEM auto parts exporter from South Korea to Azerbaijan. Authentic Hyundai Mobis and Kia Genuine parts with 3-7 day express air delivery to Baku.",
  keywords: "Hyundai Mobis, Kia parts Baku, Korean auto parts Azerbaijan, Hyundai Sonata parts, Kia K5 parts, Mobis direct export",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <CurrencyProvider>
        <RequestModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <RequestModal />
        </RequestModalProvider>
      </CurrencyProvider>
    </NextIntlClientProvider>
  );
}
