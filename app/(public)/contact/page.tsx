import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <div className="grid-floor"></div>
      <Navbar />

      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-[600px] mx-auto">
          <header className="mb-12 text-center">
            <h1 className="font-display text-4xl text-[var(--text-bright)] mb-4">
              建立链路 <span className="text-[var(--accent-cyan)]">// CONTACT</span>
            </h1>
            <p className="text-[var(--text-soft)]">
              向操作员发送加密信号。
            </p>
          </header>

          <form className="space-y-8">
             {/* Name Input */}
            <div className="relative group">
              <label className="block text-xs font-mono text-[var(--accent-cyan)] mb-2 uppercase tracking-widest">
                识别码 (ID)
              </label>
              <div 
                className="relative bg-[rgba(4,12,24,0.6)]"
                style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
              >
                <input 
                  type="text" 
                  className="w-full bg-transparent border border-[var(--border-light)] p-4 text-[var(--text-bright)] focus:outline-none focus:border-[var(--accent-cyan)] transition-colors placeholder-[rgba(255,255,255,0.2)]"
                  placeholder="USER_NAME"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative group">
              <label className="block text-xs font-mono text-[var(--accent-cyan)] mb-2 uppercase tracking-widest">
                回传地址 (Email)
              </label>
              <div 
                className="relative bg-[rgba(4,12,24,0.6)]"
                style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
              >
                <input 
                  type="email" 
                  className="w-full bg-transparent border border-[var(--border-light)] p-4 text-[var(--text-bright)] focus:outline-none focus:border-[var(--accent-cyan)] transition-colors placeholder-[rgba(255,255,255,0.2)]"
                  placeholder="signal@example.com"
                />
              </div>
            </div>

             {/* Message Input */}
            <div className="relative group">
              <label className="block text-xs font-mono text-[var(--accent-cyan)] mb-2 uppercase tracking-widest">
                数据包 (Message)
              </label>
              <div 
                className="relative bg-[rgba(4,12,24,0.6)]"
                style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
              >
                <textarea 
                  rows={6}
                  className="w-full bg-transparent border border-[var(--border-light)] p-4 text-[var(--text-bright)] focus:outline-none focus:border-[var(--accent-cyan)] transition-colors placeholder-[rgba(255,255,255,0.2)] resize-y"
                  placeholder="Enter transmission content..."
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[var(--accent-cyan)] text-black font-display font-bold text-lg uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_var(--accent-cyan)] transition-all duration-300"
              style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
            >
              发送信号
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
