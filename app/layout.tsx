import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/hooks/useSettings";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import ThemeWrapper from "@/components/ThemeWrapper";
import RightSidebar from "@/components/RightSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quran Mazid - Read, Study and Learn The Quran",
  description: "A premium Quran reading experience with translation and audio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Scheherazade+New&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SettingsProvider>
          <ThemeWrapper>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <div className="flex-1 flex overflow-hidden">
                {children}
                <RightSidebar />
              </div>
            </div>
            <MobileNav />
          </ThemeWrapper>
        </SettingsProvider>
      </body>
    </html>
  );
}
