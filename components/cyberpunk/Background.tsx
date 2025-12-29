export function DeepSpaceBackground() {
  return (
    <>
      {/* Deep Space Background with Horizon Glow */}
      <div 
        className="fixed inset-0 z-[-3] bg-[var(--bg-core)] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, var(--bg-horizon) 0%, transparent 70%),
            linear-gradient(180deg, rgba(3, 5, 13, 0) 0%, var(--bg-core) 100%)
          `
        }}
      />

      {/* Primary Grid Floor - Slow & Stable */}
      <div 
        className="fixed inset-[-100%] z-[-2] opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: "perspective(500px) rotateX(60deg) scale(3) translateY(-100px)",
          transformOrigin: "center top",
          // @ts-expect-error - CSS custom properties are valid
          "--bg-scroll-size": "80px",
          animation: "bg-scroll 4s linear infinite",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 60%)"
        }}
      />

      {/* Secondary Grid Floor - Fast & Glitchy (Light Shuttle Effect) */}
      <div 
        className="fixed inset-[-100%] z-[-2] opacity-10 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(var(--accent-cyan-dim) 2px, transparent 2px),
            linear-gradient(90deg, transparent 99%, var(--accent-cyan-dim) 100%)
          `,
          backgroundSize: "80px 80px",
          transform: "perspective(500px) rotateX(60deg) scale(3) translateY(-100px)",
          transformOrigin: "center top",
          // @ts-expect-error - CSS custom properties are valid
          "--bg-scroll-size": "80px",
          animation: "bg-scroll 0.5s linear infinite",
          maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 40%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 40%)"
        }}
      />

      {/* Random Light Beams (Searchlights) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div 
          className="absolute top-[-50%] left-[20%] w-[2px] h-[200%] bg-gradient-to-b from-transparent via-[var(--accent-cyan-dim)] to-transparent opacity-30 blur-[2px]"
          style={{ animation: "beam-scan 8s infinite linear", transform: "rotate(15deg)" }}
        />
        <div 
          className="absolute top-[-50%] left-[80%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-[var(--accent-magenta)] to-transparent opacity-20 blur-[1px]"
          style={{ animation: "beam-scan 12s infinite linear 2s", transform: "rotate(-15deg)" }}
        />
      </div>

      {/* Noise Texture */}
      <div 
        className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Scanline Overlay */}
      <div className="scan-overlay" />
    </>
  );
}
