"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  variant?: "default" | "minimal";
}

export default function Navbar({ variant = "default" }: NavbarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  if (variant === "minimal") {
    return (
      <nav className="fixed top-0 left-0 right-0 h-[70px] bg-[rgba(3,5,13,0.95)] border-b border-[var(--border-light)] z-[1000] flex items-center px-8 justify-between">
        <Link href="/" className="text-[var(--text-bright)] no-underline font-[var(--font-display)] font-extrabold">
          霓虹 // 广播
        </Link>
        <Link href="/" className="text-[var(--accent-cyan)] no-underline text-sm">
          [ 关闭文件 ]
        </Link>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-[70px] bg-[rgba(3,5,13,0.9)] backdrop-blur-[10px] border-b border-[var(--border-light)] z-[1000]">
      <div className="max-w-[1200px] w-[92vw] mx-auto h-full flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="font-[var(--font-display)] font-extrabold text-lg text-[var(--text-bright)] no-underline tracking-[0.1em] flex items-center gap-2.5"
        >
          <span className="w-3 h-3 bg-[var(--accent-cyan)] shadow-[var(--glow-cyan)] rotate-45"></span>
          霓虹 // 广播
        </Link>

        {/* Nav Links */}
        <div className="flex gap-8">
          <Link 
            href="/" 
            className={`text-sm uppercase tracking-[0.1em] no-underline relative transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-cyan)] after:transition-[width] after:duration-300 hover:after:w-full ${
              isActive("/") ? "text-[var(--accent-cyan)]" : "text-[var(--text-soft)] hover:text-[var(--accent-cyan)]"
            }`}
          >
            数据流
          </Link>
          <Link 
            href="/archive" 
            className={`text-sm uppercase tracking-[0.1em] no-underline relative transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-cyan)] after:transition-[width] after:duration-300 hover:after:w-full ${
              isActive("/archive") ? "text-[var(--accent-cyan)]" : "text-[var(--text-soft)] hover:text-[var(--accent-cyan)]"
            }`}
          >
            归档
          </Link>
          <Link 
            href="/tags" 
            className={`text-sm uppercase tracking-[0.1em] no-underline relative transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-cyan)] after:transition-[width] after:duration-300 hover:after:w-full ${
              isActive("/tags") ? "text-[var(--accent-cyan)]" : "text-[var(--text-soft)] hover:text-[var(--accent-cyan)]"
            }`}
          >
            频段
          </Link>
          <Link 
            href="/search" 
            className={`text-sm uppercase tracking-[0.1em] no-underline relative transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-cyan)] after:transition-[width] after:duration-300 hover:after:w-full ${
              isActive("/search") ? "text-[var(--accent-cyan)]" : "text-[var(--text-soft)] hover:text-[var(--accent-cyan)]"
            }`}
          >
            检索
          </Link>
          <Link 
            href="/about" 
            className={`text-sm uppercase tracking-[0.1em] no-underline relative transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-cyan)] after:transition-[width] after:duration-300 hover:after:w-full ${
              isActive("/about") ? "text-[var(--accent-cyan)]" : "text-[var(--text-soft)] hover:text-[var(--accent-cyan)]"
            }`}
          >
            信号源
          </Link>
          <Link 
            href="/contact" 
            className={`text-sm uppercase tracking-[0.1em] no-underline relative transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-cyan)] after:transition-[width] after:duration-300 hover:after:w-full ${
              isActive("/contact") ? "text-[var(--accent-cyan)]" : "text-[var(--text-soft)] hover:text-[var(--accent-cyan)]"
            }`}
          >
            链路
          </Link>
        </div>

        {/* User Module */}
        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
          <span>访客_用户</span>
          <Link 
            href="/login" 
            className="border border-[var(--accent-magenta)] text-[var(--accent-magenta)] py-1.5 px-4 no-underline uppercase text-[0.75rem] transition-all duration-300 hover:bg-[var(--accent-magenta)] hover:text-black hover:shadow-[0_0_15px_rgba(255,79,216,0.4)]"
          >
            初始化
          </Link>
        </div>
      </div>
    </nav>
  );
}
