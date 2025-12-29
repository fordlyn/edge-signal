type SystemMetricProps = {
  label: string;
  value: string | number;
  unit?: string;
  note?: string;
  accent?: "cyan" | "magenta" | "amber";
};

function accentColor(accent: SystemMetricProps["accent"]): string {
  switch (accent) {
    case "magenta":
      return "var(--accent-magenta)";
    case "amber":
      return "var(--accent-amber)";
    default:
      return "var(--accent-cyan)";
  }
}

export default function SystemMetric({
  label,
  value,
  unit,
  note,
  accent = "cyan",
}: SystemMetricProps) {
  const color = accentColor(accent);

  return (
    <dl
      className="relative border border-white/10 bg-[var(--bg-panel)] p-5"
      style={{
        clipPath:
          "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
      }}
    >
      <div aria-hidden className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/15" />
      <div aria-hidden className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/15" />

      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        {label}
      </dt>
      <dd className="mt-2 flex items-baseline gap-2">
        <span
          className="font-display text-4xl leading-none"
          style={{
            color,
            textShadow: `0 0 18px ${color}33`,
          }}
        >
          {value}
        </span>
        {unit && (
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">
            {unit}
          </span>
        )}
      </dd>

      {note && (
        <div className="mt-3 border-t border-white/10 pt-3 font-mono text-xs text-[var(--text-soft)] opacity-80">
          {note}
        </div>
      )}
    </dl>
  );
}
