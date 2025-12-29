import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.1)] py-12 mt-8 text-center text-[var(--text-muted)] text-xs">
      <div className="max-w-[1200px] w-[92vw] mx-auto flex flex-col items-center gap-6">
        <div className="flex gap-6 uppercase tracking-widest opacity-70">
          <Link href="/archive" className="hover:text-[var(--accent-cyan)] transition-colors">归档</Link>
          <Link href="/tags" className="hover:text-[var(--accent-cyan)] transition-colors">频段</Link>
          <Link href="/categories" className="hover:text-[var(--accent-cyan)] transition-colors">分区</Link>
          <Link href="/contact" className="hover:text-[var(--accent-cyan)] transition-colors">通信</Link>
        </div>
        
        <div>
          系统日志 // V8.4 运行中 // 传输结束
        </div>
      </div>
    </footer>
  );
}
