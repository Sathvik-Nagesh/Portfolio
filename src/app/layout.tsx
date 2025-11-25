import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ChatWidget } from "@/components/chat-widget";
import { StarsCanvas } from "@/components/ui/stars-background";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sathvik Nagesh | Cybersecurity Analyst",
  description: "Portfolio of Sathvik Nagesh, a Cybersecurity Analyst and Full Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={outfit.className}>
        <StarsCanvas />
        <Navbar />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
