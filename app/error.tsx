"use client";

import { useEffect } from "react";
import { Button } from "@/components/cyberpunk/Button";
import { GlitchText } from "@/components/cyberpunk/GlitchText";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center overflow-hidden bg-[var(--bg-core)] relative">
      <div 
        className="fixed top-0 left-0 w-full h-1.5 bg-[rgba(255,0,0,0.8)] opacity-50 pointer-events-none"
        style={{ animation: "scan 0.5s linear infinite" }}
      />
      
      <GlitchText size="8xl" className="text-[var(--accent-red)]">
        500
      </GlitchText>

      <div className="text-xl tracking-[0.2rem] text-[var(--text-soft)] mb-12 uppercase">
        {"//"} 致命故障: 核心 <span className="text-[var(--accent-red)]">崩溃</span><br />
        System Core Dumped
      </div>

      <div className="flex gap-6">
        <Button 
          onClick={() => reset()}
          variant="danger"
          fullWidth={false}
        >
          重启系统
        </Button>
        <Button href="/" variant="primary" fullWidth={false}>
          紧急撤离
        </Button>
      </div>
    </div>
  );
}
