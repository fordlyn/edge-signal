"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/cyberpunk/Button";
import { Input } from "@/components/cyberpunk/Input";
import { Card } from "@/components/cyberpunk/Card";
import { DeepSpaceBackground } from "@/components/cyberpunk/Background";
import { LoadingOverlay } from "@/components/cyberpunk/LoadingOverlay";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"idle" | "verifying" | "connecting">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("verifying");
    
    // UI Feedback Phase
    setTimeout(() => {
      setStep("connecting");
      
      // Connection Phase
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }, 800);
  };

  return (
    <>
      <DeepSpaceBackground />
      
      {step === "connecting" && <LoadingOverlay />}

      <div className="min-h-screen flex items-center justify-center p-8 overflow-hidden relative" style={{ perspective: "1000px" }}>
        
        {/* Main Panel Container */}
        <div 
          className="
            relative w-full max-w-[460px] p-1 
            opacity-0 translate-y-5
          "
          style={{
            animation: "panel-intro 0.8s var(--ease-out-quart) forwards 0.2s"
          }}
        >
          {/* Inner Panel Content */}
          <Card className="p-12">
            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center justify-between mb-2">
                 <div className="h-[2px] w-8 bg-[var(--accent-cyan)]" />
                 <div className="text-[10px] text-[var(--text-muted)] font-mono tracking-widest">SYS.AUTH.V3</div>
              </div>
              
              <h1 className="font-display text-3xl m-0 tracking-[0.1em] uppercase text-white drop-shadow-[0_0_10px_rgba(25,247,255,0.5)]">
                身份验证
              </h1>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 bg-[var(--accent-magenta)] rounded-full animate-pulse" />
                <span className="text-xs text-[var(--accent-magenta)] tracking-[0.2em] font-mono">
                  SECURE_LAYER_03
                </span>
              </div>
            </header>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Input id="username" label="操作员 ID" required />
              <Input id="password" label="访问密钥" type="password" required />
              
              <div className="mt-10">
                <Button 
                  isVerifying={step === "verifying"} 
                  verifyingText="正在校验..."
                >
                  初始化链路
                </Button>
              </div>
            </form>

            {/* Footer */}
            <footer className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.05)]">
              <div className="flex justify-between items-end">
                <div className="text-[var(--text-muted)] text-[0.6rem] font-mono leading-relaxed opacity-70">
                  <p>TERMINAL: T-8842</p>
                  <p>IP: PROTECTED</p>
                </div>
                
                <Link 
                  href="/" 
                  className="text-[var(--text-soft)] text-xs no-underline transition-all duration-300 hover:text-[var(--accent-cyan)] flex items-center gap-2 group"
                >
                  <span>[ 访客通道 ]</span>
                  <span className="text-[var(--accent-cyan)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    &gt;
                  </span>
                </Link>
              </div>
            </footer>
          </Card>
        </div>
      </div>
    </>
  );
}

