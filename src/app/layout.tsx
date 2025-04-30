import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: "App Establecimientos",
  description: "App Establecimientos",
};

const inter = Inter({subsets:['latin']});

interface RootLayoutProps{
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} >
        <main className="min-h-screen flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
