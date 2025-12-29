import type { ReactNode } from "react";

type DataPanelTone = "neutral" | "cyan" | "magenta" | "amber";

type DataPanelFooter = {
  left?: ReactNode;
  right?: ReactNode;
};

type DataPanelProps = {
  title: string;
  tone?: DataPanelTone;
  badge?: string;
  index?: string;
  footer?: DataPanelFooter;
  children: ReactNode;
};

function toneVars(tone: DataPanelTone): {
  border: string;
  label: string;
  glow: string;
  bg: string;
} {
  switch (tone) {
    case "magenta":
      return {
        border: "border-[rgba(255,79,216,0.35)]",
        label: "text-[var(--accent-magenta)]",
        glow: "shadow-[0_0_30px_rgba(255,79,216,0.12)]",
        bg: "bg-[rgba(4,12,24,0.70)]",
      };
    case "amber":
      return {
        border: "border-[rgba(255,200,87,0.35)]",
        label: "text-[var(--accent-amber)]",
        glow: "shadow-[0_0_30px_rgba(255,200,87,0.10)]",
        bg: "bg-[rgba(4,12,24,0.70)]",
      };
    case "cyan":
      return {
        border: "border-[rgba(25,247,255,0.35)]",
        label: "text-[var(--accent-cyan)]",
        glow: "shadow-[0_0_30px_rgba(25,247,255,0.12)]",
        bg: "bg-[rgba(4,12,24,0.70)]",
      };
    default:
      return {
        border: "border-white/10",
        label: "text-[var(--text-muted)]",
        glow: "shadow-none",
        bg: "bg-[rgba(4,12,24,0.65)]",
      };
  }
}

export default function DataPanel({
  title,
  badge,
  index,
  tone = "neutral",
  footer,
  children,
}: DataPanelProps) {
  const v = toneVars(tone);

  const footerLeft = footer?.left;
  const footerRight = footer?.right;
  const hasFooter = Boolean(footerLeft) || Boolean(footerRight);

  let footerJustify = "justify-start";
  if (footerLeft && footerRight) {
    footerJustify = "justify-between";
  } else if (footerRight) {
    footerJustify = "justify-end";
  }

  return (
    <section
      className={`relative my-10 overflow-hidden border ${v.border} ${v.bg} ${v.glow}`}
      style={{
        clipPath:
          "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
      }}
      aria-label={title}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.035) 3px, rgba(255,255,255,0.035) 4px)",
        }}
      />

      <div aria-hidden className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/15" />
      <div aria-hidden className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/15" />

      <header className="relative flex items-start justify-between gap-6 px-6 pt-5 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            {index && (
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                {index}
              </span>
            )}
            <h4 className="m-0 font-display text-sm uppercase tracking-[0.18em] text-[var(--text-bright)]">
              {title}
            </h4>
            {badge && (
              <span className={`font-mono text-[10px] uppercase tracking-[0.25em] ${v.label}`}>
                [{badge}]
              </span>
            )}
          </div>
        </div>

        <div aria-hidden className="flex items-center gap-2 pt-1">
          <span className={`h-1.5 w-1.5 rotate-45 ${v.label}`} style={{ backgroundColor: "currentColor" }} />
          <span className="h-px w-10 bg-white/10" />
        </div>
      </header>

      <div className="relative px-6 py-6 text-[var(--text-soft)]">
        {children}
      </div>

      {hasFooter && (
        <footer
          className={`relative px-6 py-3 border-t border-white/10 bg-black/15 flex items-center gap-6 ${footerJustify}`}
        >
          {footerLeft && (
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
              {footerLeft}
            </div>
          )}
          {footerRight && (
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
              {footerRight}
            </div>
          )}
        </footer>
      )}
    </section>
  );
}
