import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { Button } from "@/components/cyberpunk/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center overflow-hidden relative">
      {/* Background Grid for context */}
      <div 
        className="fixed inset-0 z-[-1] opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: "perspective(500px) rotateX(60deg) scale(2) translateY(-50px)",
        }}
      />

      {/* Enhanced Scan Line */}
      <div 
        className="fixed top-0 left-0 w-full h-1.5 bg-[rgba(255,60,60,0.5)] opacity-50 pointer-events-none z-50"
        style={{ animation: "scan 3s linear infinite" }}
      />

      {/* Glitch Wrapper */}
      <GlitchText size="8xl">404</GlitchText>

      {/* Message */}
      <div className="text-xl tracking-[0.2rem] text-[#888] mb-12 uppercase font-mono">
        {"//"} 严重错误: 节点 <span className="text-[var(--accent-red)]">未找到</span><br />
        目标坐标无效
      </div>

      {/* Return Button */}
      <Button href="/" variant="primary" fullWidth={false}>
        重新建立上行链路
      </Button>
    </div>
  );
}
