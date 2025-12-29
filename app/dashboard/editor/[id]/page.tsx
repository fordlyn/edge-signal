export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl">编辑信号 <span className="text-[var(--text-muted)] text-xl">// ID: {id}</span></h1>
        <div className="flex gap-4">
           <button className="text-[var(--text-muted)] hover:text-[var(--text-bright)] uppercase text-sm tracking-wider">Save Changes</button>
           <button className="bg-[var(--accent-cyan)] text-black px-6 py-2 font-bold uppercase tracking-wider hover:bg-white transition-colors">Update</button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Editor Area */}
        <div className="bg-[var(--bg-panel)] border border-[rgba(255,255,255,0.05)] flex flex-col">
          <input 
            type="text" 
            defaultValue="Mock Title for Edit"
            className="bg-transparent border-b border-[rgba(255,255,255,0.05)] p-4 text-2xl font-display text-[var(--text-bright)] focus:outline-none focus:border-[var(--accent-cyan)] placeholder-[rgba(255,255,255,0.1)]"
          />
          <textarea 
            className="flex-1 bg-transparent p-4 font-mono text-sm text-[var(--text-soft)] focus:outline-none resize-none placeholder-[rgba(255,255,255,0.1)]"
            defaultValue="Mock content..."
          ></textarea>
        </div>

        {/* Preview Area */}
        <div className="bg-[var(--bg-panel)] border border-[rgba(255,255,255,0.05)] p-8 overflow-y-auto">
           <div className="prose prose-invert max-w-none">
             <h1>Mock Title for Edit</h1>
             <p>Mock content...</p>
           </div>
        </div>
      </div>
    </div>
  );
}
