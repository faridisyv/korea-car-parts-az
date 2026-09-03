import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "mobis_korea_azerbaijan_secret_key_2026";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createAdminToken(email: string): string {
  const payload = {
    email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const str = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signature = Buffer.from(`${str}:${ADMIN_SECRET}`).toString("base64");
  return `${str}.${signature}`;
}

export function verifyAdminToken(token: string): { email: string } | null {
  try {
    const [str, signature] = token.split(".");
    if (!str || !signature) return null;
    const expectedSig = Buffer.from(`${str}:${ADMIN_SECRET}`).toString("base64");
    if (signature !== expectedSig) return null;
    const payload = JSON.parse(Buffer.from(str, "base64").toString("utf8"));
    if (payload.exp < Date.now()) return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
