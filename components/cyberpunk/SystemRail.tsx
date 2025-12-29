"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SystemRail() {
  const pathname = usePathname();
  
  const navItems = [
    { label: "控制中心", code: "CMD", path: "/dashboard" },
    { label: "档案管理", code: "ARC", path: "/dashboard/posts" },
    { label: "信号编辑器", code: "WAV", path: "/dashboard/editor" },
    { label: "评论审核", code: "MOD", path: "/dashboard/comments" },
    { label: "系统配置", code: "CFG", path: "/dashboard/settings" },
  ];

  return (
    <aside className="w-[260px] bg-[var(--bg-panel-solid)] border-r border-[var(--border-light)] flex flex-col min-h-screen fixed left-0 top-0 z-50">
      {/* Brand Header */}
      <div className="h-[80px] flex items-center px-6 border-b border-[var(--border-light)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent-cyan)] opacity-50" />
        <div>
          <h1 className="font-display text-xl text-[var(--accent-cyan)] tracking-[0.2em]">NEON//OPS</h1>
          <div className="text-[10px] text-[var(--text-muted)] font-mono tracking-widest mt-1">
            V.3.0.1 ALPHA
          </div>
        </div>
        
        {/* Animated grid background for header */}
        <div className="absolute inset-0 z-[-1] opacity-10" 
          style={{ 
            backgroundImage: "linear-gradient(90deg, var(--accent-cyan) 1px, transparent 1px)",
            backgroundSize: "20px 100%"
          }} 
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-4">
        <div className="text-[10px] text-[var(--text-muted)] font-mono mb-4 px-2 tracking-[0.2em] uppercase opacity-50">
          // Modules
        </div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path}
              href={item.path}
              className={`
                group relative flex items-center justify-between px-4 py-3 
                transition-all duration-300 overflow-hidden
                ${isActive ? "bg-[rgba(25,247,255,0.05)]" : "hover:bg-[rgba(255,255,255,0.02)]"}
              `}
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)"
              }}
            >
              {/* Active Indicator Line */}
              <div className={`
                absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--accent-cyan)] transition-all duration-300
                ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
              `} />

              <div className="flex flex-col z-10">
                <span className={`
                  text-sm tracking-wider font-medium transition-colors duration-300
                  ${isActive ? "text-[var(--accent-cyan)]" : "text-[var(--text-soft)] group-hover:text-[var(--text-bright)]"}
                `}>
                  {item.label}
                </span>
                <span className="text-[9px] font-mono text-[var(--text-muted)] tracking-widest">
                  ::{item.code}
                </span>
              </div>

              {/* Status Light */}
              <div className={`
                w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-[0_0_5px_currentColor]
                ${isActive ? "bg-[var(--accent-cyan)]" : "bg-[var(--text-muted)] opacity-30"}
              `} />
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-[var(--border-light)] bg-[rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-3 p-2 rounded border border-transparent hover:border-[var(--text-muted)] transition-all cursor-pointer group">
          <div className="w-10 h-10 bg-[var(--bg-core)] border border-[var(--accent-cyan)] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--accent-cyan)] opacity-20" />
            <span className="font-mono font-bold text-[var(--accent-cyan)] text-xs group-hover:animate-pulse">OP</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-xs text-[var(--text-bright)] font-mono truncate">OPERATOR_X</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[var(--accent-cyan)] rounded-full animate-pulse" />
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Online</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
