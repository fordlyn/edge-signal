import Link from "next/link";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center bg-[var(--bg-core)] text-[var(--text-bright)]">
      <div className="w-24 h-24 mb-8 border-4 border-[var(--accent-amber)] rounded-full border-t-transparent animate-spin"></div>
      
      <h1 className="font-display text-4xl text-[var(--accent-amber)] mb-4 tracking-widest uppercase">
        System Upgrade
      </h1>
      
      <p className="font-mono text-[var(--text-muted)] mb-8">
        正在进行固件更新... 预计进度: 42%
      </p>

      <div className="w-[300px] h-1 bg-[rgba(255,255,255,0.1)] mb-12 relative overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 bg-[var(--accent-amber)] w-[42%] shadow-[0_0_10px_var(--accent-amber)]"></div>
      </div>

      <Link href="/" className="text-sm text-[var(--text-soft)] hover:text-[var(--text-bright)] border-b border-transparent hover:border-[var(--text-bright)] transition-all">
        尝试绕过 (Bypass)
      </Link>
    </div>
  );
}
