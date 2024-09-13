import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import BreadNavigation from "@/features/BreadNavigation";
import Footer from "@/features/Footer";
import Header from "@/features/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "英作文添削アプリ",
  description:
    "英作文添削アプリは、AIを活用してあなたの英語ライティングスキルを向上させるための革新的なツールです。リアルタイムで文法、語彙、構文の修正を提供し、初心者から上級者まで幅広いユーザーに対応。簡単に使えて、精度の高い添削が可能です。英語学習を効率的にサポートするこのアプリで、英作文のスキルを磨きましょう。",
  icons: [{ rel: "icon", url: "/logo_orange.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <BreadNavigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
