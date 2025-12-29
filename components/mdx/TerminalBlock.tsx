import type { ReactNode } from "react";

type TerminalBlockProps = {
  title?: string;
  children: ReactNode;
};

export default function TerminalBlock({
  title = "root@edge-signal:~",
  children,
}: TerminalBlockProps) {
  return (
    <section
      className="my-10 overflow-hidden border border-white/10 bg-[#080c15]"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
      }}
      aria-label="Terminal output"
    >
      <header className="flex items-center justify-between border-b border-white/10 bg-[#0b1020] px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-cyan)] opacity-80">
          {title}
        </span>
        <div aria-hidden className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] opacity-80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] opacity-80" />
        </div>
      </header>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(25,247,255,0.06), transparent 35%, transparent 65%, rgba(25,247,255,0.04))",
          }}
        />

        <div className="relative overflow-x-auto">
          <div className="p-6 font-mono text-sm text-[#a5b3ce]">{children}</div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-[#070a12] px-3 py-1.5 text-right">
        <span className="font-mono text-[10px] tracking-[0.25em] text-white/30">
          EOS
        </span>
      </footer>
    </section>
  );
}
