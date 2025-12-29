export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-[var(--bg-core)] z-[100] flex items-center justify-center flex-col opacity-0 animate-[panel-intro_0.5s_var(--ease-out-quart)_forwards]">
      <div className="w-[300px] h-[4px] bg-[#1a1a1a] relative overflow-hidden border border-[#333]">
        <div 
          className="absolute top-0 left-0 h-full bg-[var(--accent-cyan)] shadow-[0_0_10px_var(--accent-cyan)]"
          style={{ animation: "load 1.5s infinite ease-in-out" }}
        />
      </div>
      
      {/* Decoding Text Effect */}
      <div className="font-mono text-xs tracking-[0.5em] mt-4 text-[var(--accent-cyan)] animate-[decode-pulse_0.2s_infinite]">
        ESTABLISHING_UPLINK...
      </div>
      <div className="mt-2 text-[var(--text-muted)] text-[10px] font-mono">
        ENCRYPT_LEVEL: MAX // PROXY: ENABLED
      </div>
    </div>
  );
}
