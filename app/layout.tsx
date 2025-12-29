import type { Metadata } from "next";
import { Noto_Sans_SC, Orbitron, Share_Tech_Mono, ZCOOL_QingKe_HuangYou } from "next/font/google";
import "./globals.css";

// 正文字体 - Noto Sans SC (思源黑体)
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: false, // 中文字体建议不预加载以避免长时间阻塞，或者 Next.js 会自动处理
});

// 标题字体 - Orbitron (工业科幻)
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

// 标题字体补充 - ZCOOL QingKe HuangYou (站酷庆科黄油体 - 工业感中文)
const zcool = ZCOOL_QingKe_HuangYou({
  variable: "--font-zcool",
  weight: "400",
  subsets: ["latin"],
  preload: false,
});

// 等宽字体 - Share Tech Mono (代码/数据)
const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "霓虹广播 // Neon Broadcast",
  description: "观测数字边疆 - 工业赛博朋克博客系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${notoSansSC.variable} ${orbitron.variable} ${zcool.variable} ${shareTechMono.variable}`}>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
