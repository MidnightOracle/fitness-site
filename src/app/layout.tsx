import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Fitness Website",
  description: "Professional fitness training and coaching services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
