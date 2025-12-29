export default function SettingsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl mb-8">系统配置 <span className="text-[var(--text-muted)] text-xl">// SETTINGS</span></h1>
      
      <div className="max-w-[600px] space-y-8">
        <div className="bg-[var(--bg-panel)] border border-[rgba(255,255,255,0.05)] p-6">
          <h2 className="text-xl font-display mb-6 text-[var(--accent-cyan)]">General</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Blog Title</label>
              <input type="text" defaultValue="Neon Broadcast" className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] p-3 text-[var(--text-bright)] focus:border-[var(--accent-cyan)] outline-none" />
            </div>
             <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Description</label>
              <textarea defaultValue="Observing the digital frontier." className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] p-3 text-[var(--text-bright)] focus:border-[var(--accent-cyan)] outline-none" rows={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
