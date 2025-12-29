export default function DashboardPage() {
  const stats = [
    { label: "Total Posts", value: "42", color: "var(--accent-cyan)" },
    { label: "Total Views", value: "8,902", color: "var(--accent-magenta)" },
    { label: "Comments", value: "128", color: "var(--accent-amber)" },
    { label: "Uptime", value: "99.9%", color: "var(--text-bright)" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl mb-8">控制中心 <span className="text-[var(--text-muted)] text-xl">// DASHBOARD</span></h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[var(--bg-panel)] border border-[rgba(255,255,255,0.05)] p-6">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">{stat.label}</div>
            <div className="text-3xl font-display" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Activity Log */}
      <div className="bg-[var(--bg-panel)] border border-[rgba(255,255,255,0.05)] p-6">
        <h2 className="text-sm text-[var(--text-muted)] uppercase tracking-widest mb-6 border-b border-[rgba(255,255,255,0.05)] pb-4">
          Recent Activity
        </h2>
        <div className="space-y-4 font-mono text-sm">
          <div className="flex gap-4">
            <span className="text-[var(--text-muted)]">10:42:01</span>
            <span className="text-[var(--accent-cyan)]">LOGIN</span>
            <span>Operator_X accessed the system via encrypted channel.</span>
          </div>
          <div className="flex gap-4">
            <span className="text-[var(--text-muted)]">09:15:33</span>
            <span className="text-[var(--accent-amber)]">COMMENT</span>
            <span>New comment from User_992 on "Neural Protocol v2".</span>
          </div>
          <div className="flex gap-4">
            <span className="text-[var(--text-muted)]">08:00:00</span>
            <span className="text-[var(--accent-magenta)]">SYSTEM</span>
            <span>Daily backup completed successfully.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
