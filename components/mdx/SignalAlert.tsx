import type { ReactNode } from "react";

type SignalAlertVariant = "info" | "warning" | "danger" | "success";

type SignalAlertProps = {
  variant?: SignalAlertVariant;
  title?: string;
  children: ReactNode;
};

const VARIANT_STYLES: Record<SignalAlertVariant, { border: string; fg: string; bg: string; badge: string }> = {
  info: {
    border: "border-[var(--accent-cyan)]",
    fg: "text-[var(--text-bright)]",
    bg: "bg-[rgba(25,247,255,0.06)]",
    badge: "text-[var(--accent-cyan)]",
  },
  warning: {
    border: "border-[var(--accent-amber)]",
    fg: "text-[var(--text-bright)]",
    bg: "bg-[rgba(255,200,87,0.08)]",
    badge: "text-[var(--accent-amber)]",
  },
  danger: {
    border: "border-[var(--accent-magenta)]",
    fg: "text-[var(--text-bright)]",
    bg: "bg-[rgba(255,79,216,0.06)]",
    badge: "text-[var(--accent-magenta)]",
  },
  success: {
    border: "border-[var(--accent-cyan)]",
    fg: "text-[var(--text-bright)]",
    bg: "bg-[rgba(25,247,255,0.04)]",
    badge: "text-[var(--accent-cyan)]",
  },
};

export default function SignalAlert({
  variant = "info",
  title,
  children,
}: SignalAlertProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <aside
      className={`relative my-10 overflow-hidden border-l-[3px] ${styles.border} ${styles.bg} ${styles.fg}`}
      style={{
        clipPath:
          "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
      }}
      role={variant === "danger" ? "alert" : undefined}
      aria-label={title ? undefined : `Signal ${variant}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.04) 4px)",
        }}
      />

      <div className="relative p-5 md:p-6">
        <div aria-hidden className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/15" />
        <div aria-hidden className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/15" />

        {(title || variant) && (
          <div className="mb-3 flex items-center gap-3">
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.25em] ${styles.badge}`}
            >
              [{variant}]
            </span>
            {title && (
              <span className="font-display text-sm uppercase tracking-[0.18em]">
                {title}
              </span>
            )}
          </div>
        )}

        <div className="text-[var(--text-soft)] leading-relaxed">{children}</div>
      </div>
    </aside>
  );
}
