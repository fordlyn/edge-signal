export function MechanicalDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--accent-cyan)] opacity-50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--accent-cyan)] opacity-50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--accent-cyan)] opacity-50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--accent-cyan)] opacity-50" />
      
      {/* Screw Heads */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full shadow-inner" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full shadow-inner" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full shadow-inner" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full shadow-inner" />

      {/* Side Data Bars */}
      <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-1 h-32 flex flex-col gap-1 opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-full bg-[var(--accent-cyan)] h-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
      <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-1 h-32 flex flex-col gap-1 opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-full bg-[var(--accent-magenta)] h-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </div>
  );
}
