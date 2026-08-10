import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "TEJA NETWORK — Personal Portfolio & Broadcast Console",
  description: "A custom personal television network showcasing software systems, AI experiments, machine learning pipelines, and technical archives. Broadcasting 24/7.",
  keywords: ["Teja Network", "Computer Science Portfolio", "AI Assistant", "Machine Learning", "FastAPI", "Systems Developer"],
  openGraph: {
    title: "TEJA NETWORK — Personal Portfolio & Broadcast Console",
    description: "An interactive TV broadcast interface detailing systems projects, machine learning models, and live labs.",
    type: "website",
    locale: "en_US",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="h-full bg-[#0A0A0A] text-[#F2F2F2]">
        {children}
      </body>
    </html>
  );
}
