import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ridgewood Coffee",
  description: "A cozy local coffee shop serving quality beverages and building community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js`}
          strategy="lazyOnload"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
