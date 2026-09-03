import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Korea Car Parts AZ | Genuine Hyundai & Kia Mobis Auto Parts Direct from South Korea",
  description:
    "Direct OEM auto parts exporter from South Korea to Azerbaijan. Authentic Hyundai Mobis and Kia Genuine parts with 3-7 day express air delivery to Baku.",
  keywords:
    "Hyundai Mobis, Kia parts Baku, Korean auto parts Azerbaijan, Hyundai Sonata parts, Kia K5 parts, Mobis direct export",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#08090c] text-white min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
