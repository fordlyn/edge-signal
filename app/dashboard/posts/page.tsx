import Link from "next/link";

export default function PostsManagementPage() {
  const posts = [
    { id: 1, title: "第四扇区的生物发光花园", status: "Published", date: "2084-12-25" },
    { id: 2, title: "旧网的回声", status: "Published", date: "2084-12-10" },
    { id: 3, title: "草稿: 神经接口协议 v3", status: "Draft", date: "2084-12-28" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl">档案管理 <span className="text-[var(--text-muted)] text-xl">// POSTS</span></h1>
        <Link 
          href="/dashboard/editor"
          className="bg-[var(--accent-cyan)] text-black px-6 py-2 font-bold uppercase tracking-wider hover:bg-white transition-colors"
        >
          New Signal
        </Link>
      </div>

      <div className="bg-[var(--bg-panel)] border border-[rgba(255,255,255,0.05)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.1)] text-xs text-[var(--text-muted)] uppercase tracking-widest">
              <th className="p-4 font-normal">Title</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal">Date</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <td className="p-4 font-display text-[var(--text-bright)]">{post.title}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 border ${
                    post.status === "Published" 
                      ? "border-[var(--accent-cyan)] text-[var(--accent-cyan)]" 
                      : "border-[var(--accent-amber)] text-[var(--accent-amber)]"
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-4 font-mono text-sm text-[var(--text-muted)]">{post.date}</td>
                <td className="p-4 text-right space-x-4">
                  <Link href={`/dashboard/editor/${post.id}`} className="text-[var(--text-soft)] hover:text-[var(--accent-cyan)] transition-colors">Edit</Link>
                  <button className="text-[var(--text-soft)] hover:text-[var(--accent-red)] transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
