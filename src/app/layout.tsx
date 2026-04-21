import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-google",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-google",
  display: "swap",
});

const SITE = "https://www.divyanshutyagiofficial.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default:
      "Divyanshu Tyagi — Full-Stack Technical Lead | React, Node, .NET, Java, Web3",
    template: "%s · Divyanshu Tyagi",
  },
  description:
    "Full-Stack Technical Lead with 8+ years building enterprise web apps across FinTech, Healthcare, Web3 and headless CMS. Specialising in React, Next.js, Node, .NET and Java.",
  keywords: [
    "Divyanshu Tyagi",
    "Full Stack Developer",
    "Technical Lead",
    "React Developer",
    "Next.js",
    "Node.js",
    ".NET",
    "Java",
    "Web3",
    "Blockchain",
    "FinTech",
    "Healthcare",
    "Portfolio",
  ],
  authors: [{ name: "Divyanshu Tyagi", url: SITE }],
  creator: "Divyanshu Tyagi",
  openGraph: {
    type: "website",
    url: SITE,
    title:
      "Divyanshu Tyagi — Full-Stack Technical Lead | React, Node, .NET, Java, Web3",
    description:
      "Building production-grade web apps for FinTech, Healthcare and Web3. 8+ years, technical leadership, enterprise scale.",
    siteName: "divyanshutyagiofficial.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyanshu Tyagi — Full-Stack Technical Lead",
    description:
      "Full-Stack Technical Lead — React, Next.js, Node, .NET, Java, Web3.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
