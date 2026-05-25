import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollRefresh from "@/components/providers/ScrollRefresh";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Aidan Ismail",
  description: "Sebuah Portofolio Endurance Test Cretivox Internship Experience"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className={`${monaSans.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col" suppressHydrationWarning>
          <ScrollRefresh></ScrollRefresh>
          <SmoothScroll>{children}</SmoothScroll>
        </body>
      </html>
    </>
  );
}
