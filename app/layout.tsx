import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  icons: { icon: "/logo.jpg" },
  title: "Sway — Buy Together, Save Together",
  description:
    "Web3-based collective buying platform. Pool demand, unlock bulk discounts, pay less — secured by smart contracts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${quicksand.variable}`}>
      <body className="bg-dark antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
