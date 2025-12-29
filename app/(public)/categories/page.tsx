import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllPosts } from "@/lib/posts";

const CATEGORY_DESC: Record<string, string> = {
  关键: "核心系统日志与重大事件",
  资讯: "外部网络信号捕获",
  研究: "技术分析与实验报告",
};

export default async function CategoriesPage() {
  const posts = await getAllPosts();
  const categoryCount = new Map<string, number>();

  for (const post of posts) {
    categoryCount.set(
      post.metadata.category,
      (categoryCount.get(post.metadata.category) ?? 0) + 1,
    );
  }

  const categories = [...categoryCount.entries()]
    .map(([name, count]) => ({
      name,
      count,
      desc: CATEGORY_DESC[name] ?? "未知分区",
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return (
    <>
      <div className="grid-floor"></div>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6 max-w-[800px] mx-auto">
        <h1 className="font-display text-4xl mb-12">
          分区索引 <span className="text-[var(--accent-cyan)]">// CATEGORIES</span>
        </h1>

        <div className="grid gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/categories/${encodeURIComponent(cat.name)}`}
              className="block border border-[rgba(255,255,255,0.1)] p-6 hover:border-[var(--accent-cyan)] transition-colors no-underline group"
            >
              <h2 className="text-2xl text-[var(--text-bright)] group-hover:text-[var(--accent-cyan)] mb-2">
                {cat.name}
              </h2>
              <p className="text-[var(--text-soft)]">{cat.desc}</p>
              <div className="text-right text-xs font-mono text-[var(--text-muted)] mt-4">
                Logs: {cat.count}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
