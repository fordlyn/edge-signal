import { SystemRail } from "@/components/cyberpunk/SystemRail";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-core)] text-[var(--text-bright)] selection:bg-[var(--accent-cyan)] selection:text-black">
      <SystemRail />
      
      <div className="ml-[260px] min-h-screen relative">
        {/* Subtle Background Grid for Dashboard Area */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(var(--text-muted) 1px, transparent 1px),
              linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top Status Monitor Bar */}
        <header className="h-[80px] border-b border-[var(--border-light)] bg-[var(--bg-panel-solid)] flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
          
          {/* Left: Breadcrumbs / Status */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-[0.2em] mb-1">System Status</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent-cyan)] rounded-full shadow-[0_0_8px_var(--accent-cyan)]" />
                <span className="text-sm font-mono text-[var(--accent-cyan)] tracking-wider">NORMAL_OPERATIONS</span>
              </div>
            </div>
            
            <div className="h-8 w-[1px] bg-[var(--border-light)]" />
            
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-[0.2em] mb-1">Network</span>
              <div className="text-sm font-mono text-[var(--text-soft)]">
                UPLINK: <span className="text-[var(--text-bright)]">100%</span>
              </div>
            </div>
          </div>

          {/* Right: Clock / Tools */}
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 border border-[var(--text-muted)] rounded-none text-[10px] font-mono text-[var(--text-muted)] opacity-50">
               T-MINUS: 00:00:00
             </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-8 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
