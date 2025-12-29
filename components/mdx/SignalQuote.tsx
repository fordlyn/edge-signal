import type { ReactNode } from "react";

type SignalQuoteProps = {
  label?: string;
  children: ReactNode;
};

export default function SignalQuote({
  label = "QUOTE // 引用片段",
  children,
}: SignalQuoteProps) {
  return (
    <figure
      className="relative my-10 overflow-hidden border border-white/10 bg-[rgba(4,12,24,0.55)]"
      style={{
        clipPath:
          "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.04) 4px)",
        }}
      />

      <div aria-hidden className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--accent-cyan)]/30" />
      <div aria-hidden className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--accent-cyan)]/30" />

      <figcaption className="relative px-6 pt-5 pb-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent-cyan)] opacity-80">
          {label}
        </div>
      </figcaption>

      <blockquote className="relative px-6 pb-6 text-[var(--text-soft)]">
        {children}
      </blockquote>
    </figure>
  );
}
