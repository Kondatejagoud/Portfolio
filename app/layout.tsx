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
  title: "Konda Teja | AI, Software & Systems",
  description: "Konda Teja's personal portfolio showcasing AI systems, software projects, machine learning, backend development and ongoing technical work.",
  keywords: ["Konda Teja", "Teja Network", "Computer Science Portfolio", "AI Assistant", "Machine Learning", "FastAPI", "Systems Developer"],
  openGraph: {
    title: "TEJA NETWORK — Konda Teja",
    description: "Konda Teja's personal portfolio showcasing AI systems, software projects, machine learning, and backend work.",
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
      <body className="h-full bg-[#080A0C] text-[#E6E8EA]">
        {children}
      </body>
    </html>
  );
}
