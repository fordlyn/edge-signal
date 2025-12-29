import Navbar from "@/components/Navbar";

export default function AboutPage() {
  const skills = [
    { name: "界面设计", level: 92, color: "var(--accent-cyan)" },
    { name: "系统架构", level: 85, color: "var(--accent-magenta)" },
    { name: "密码学", level: 70, color: "var(--accent-amber)" }
  ];

  const stats = [
    { label: "在线时间", value: "99.9%" },
    { label: "提交次数", value: "8,241" },
    { label: "扇区", value: "07" },
    { label: "状态", value: "在线" }
  ];

  return (
    <>
      <Navbar variant="minimal" />

      <div className="min-h-screen pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 md:gap-16">
          
          {/* Left Column: Identity Card */}
          <aside className="relative">
            {/* Identity Container */}
            <div 
              className="bg-bg-panel/50 backdrop-blur-sm border border-accent-cyan/20 p-8 text-center sticky top-28"
              style={{
                clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
              }}
            >
              {/* Decorative Corner Markers */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-cyan opacity-50" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent-cyan opacity-50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-cyan opacity-50" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent-cyan opacity-50" />

              {/* Avatar Frame */}
              <div className="relative w-40 h-40 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/30 animate-pulse" />
                <div 
                  className="absolute inset-2 rounded-full border border-dashed border-accent-cyan/60"
                  style={{ animation: "spin 20s linear infinite" }}
                />
                <div className="absolute inset-4 rounded-full bg-bg-panel-solid overflow-hidden flex items-center justify-center border border-accent-cyan/20">
                  <div 
                    className="w-full h-full opacity-50"
                    style={{
                      backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 2px, var(--accent-cyan-dim) 2px, var(--accent-cyan-dim) 4px)"
                    }}
                  />
                  <span className="absolute text-4xl font-display text-accent-cyan">X</span>
                </div>
              </div>

              {/* Identity Text */}
              <div className="space-y-2 mb-8">
                <h2 className="m-0 font-display text-2xl uppercase tracking-widest text-text-bright">
                  操作员_X
                </h2>
                <div className="flex items-center justify-center gap-2 text-accent-magenta text-xs tracking-[0.2em] uppercase font-mono">
                  <span className="w-1.5 h-1.5 bg-accent-magenta rounded-full animate-pulse" />
                  等级 4 管理员
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-px bg-accent-cyan/20 border border-accent-cyan/20">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-bg-panel p-3 text-left hover:bg-accent-cyan/5 transition-colors duration-300">
                    <span className="block text-text-muted text-[10px] uppercase tracking-wider mb-1 font-mono">{stat.label}</span>
                    <span className="block text-lg text-accent-cyan font-display tracking-wide">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Column: Bio & Skills */}
          <main className="space-y-12">
            
            {/* Section: Mission */}
            <section className="relative group">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-accent-cyan/20 group-hover:bg-accent-cyan/50 transition-colors" />
              <h3 className="flex items-center gap-3 text-accent-cyan font-display text-xl uppercase tracking-widest mb-6">
                <span className="w-2 h-2 bg-accent-cyan rotate-45" />
                任务陈述
              </h3>
              <div className="prose prose-invert max-w-none text-text-soft">
                <p className="text-lg leading-relaxed border-l-2 border-accent-cyan/10 pl-6 py-2">
                  专注于深网侦察和前端架构。通过代码和散文记录数字前沿。维护信号的完整性，对抗熵增和数据衰减。
                  在无限的数据流中寻找秩序，构建稳健的数字堡垒。
                </p>
              </div>
            </section>

            {/* Section: Skills */}
            <section>
              <h3 className="flex items-center gap-3 text-accent-cyan font-display text-xl uppercase tracking-widest mb-8">
                <span className="w-2 h-2 bg-accent-cyan rotate-45" />
                神经增强 (技能)
              </h3>

              <div className="space-y-6">
                {skills.map((skill, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between mb-2 font-mono text-sm text-text-muted group-hover:text-text-bright transition-colors">
                      <span className="uppercase tracking-wider">
                        <span className="text-accent-cyan mr-2">[{String(i + 1).padStart(2, '0')}]</span>
                        {skill.name}
                      </span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-bg-panel-solid border border-white/10 relative overflow-hidden">
                      {/* Grid background for bar */}
                      <div 
                        className="absolute inset-0 opacity-20" 
                        style={{ backgroundImage: "linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.1) 50%)", backgroundSize: "4px 100%" }}
                      />
                      {/* Fill Bar */}
                      <div 
                        className="h-full relative transition-all duration-1000 ease-out group-hover:brightness-125"
                        style={{
                          width: `${skill.level}%`,
                          background: skill.color,
                          boxShadow: `0 0 15px ${skill.color}`
                        }}
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white mix-blend-overlay" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer / Signature */}
            <div className="pt-12 border-t border-white/5 flex justify-between items-end text-text-muted text-xs font-mono">
              <div className="flex flex-col gap-1">
                <span>终端 ID: T-8842</span>
                <span>加密: AES-256-GCM</span>
              </div>
              <div className="text-right">
                <span>系统状态: 正常</span>
                <span className="block text-accent-cyan animate-pulse">● 已连接</span>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
