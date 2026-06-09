import type { Metadata } from "next";
import { DM_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ResumeForge — Build Professional Resumes in Minutes",
  description:
    "Create stunning, ATS-optimized resumes with smart suggestions, 4 professional templates, and instant PDF export. Free and open-source.",
  keywords: [
    "resume builder",
    "free resume",
    "ATS resume",
    "professional resume",
    "resume templates",
    "PDF resume",
  ],
  openGraph: {
    title: "ResumeForge — Build Professional Resumes in Minutes",
    description:
      "Create stunning, ATS-optimized resumes with smart suggestions and instant PDF export.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
