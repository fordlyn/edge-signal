import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllPosts } from "@/lib/posts";

type TagItem = {
  name: string;
  count: number;
  size: string;
};

function sizeClass(count: number, max: number): string {
  if (max <= 0) return "text-lg";
  const ratio = count / max;

  if (ratio > 0.8) return "text-5xl";
  if (ratio > 0.6) return "text-4xl";
  if (ratio > 0.4) return "text-3xl";
  if (ratio > 0.2) return "text-2xl";
  return "text-xl";
}

export default async function TagsPage() {
  const posts = await getAllPosts();
  const tagCount = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.metadata.tags) {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
    }
  }

  const max = Math.max(0, ...tagCount.values());

  const tags: TagItem[] = [...tagCount.entries()]
    .map(([name, count]) => ({ name, count, size: sizeClass(count, max) }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return (
    <>
      <div className="grid-floor"></div>
      <Navbar />

      <main className="min-h-screen max-w-[1000px] mx-auto pt-32 pb-20 px-6">
        <header className="mb-16 border-b border-[rgba(255,255,255,0.1)] pb-8 text-center">
          <h1 className="font-display text-4xl text-[var(--text-bright)] mb-4">
            频段索引 <span className="text-[var(--accent-cyan)]">// TAGS</span>
          </h1>
          <p className="text-[var(--text-muted)]">Available frequencies: {tags.length}</p>
        </header>

        <div className="flex flex-wrap justify-center gap-8 py-10">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              href={`/tags/${encodeURIComponent(tag.name)}`}
              className={`
                relative group no-underline
                ${tag.size} font-display
                text-[var(--text-muted)] hover:text-[var(--accent-cyan)]
                transition-all duration-300
              `}
            >
              <span className="opacity-80 group-hover:opacity-100 group-hover:text-shadow-[0_0_15px_var(--accent-cyan)]">
                #{tag.name}
              </span>
              <span className="absolute -top-2 -right-2 text-xs font-mono text-[var(--accent-magenta)] opacity-0 group-hover:opacity-100 transition-opacity">
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
