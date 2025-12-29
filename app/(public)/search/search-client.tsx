"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SearchPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  category: string;
  date: string;
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export default function SearchClient({ posts }: { posts: SearchPost[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];

    return posts
      .filter((post) => {
        const haystack = [
          post.title,
          post.excerpt,
          post.category,
          post.tags.join(" "),
        ]
          .join("\n")
          .toLowerCase();

        return haystack.includes(q);
      })
      .slice(0, 20);
  }, [posts, query]);

  return (
    <>
      {/* Search Input */}
      <div className="relative mb-16 group">
        <div className="absolute inset-0 bg-[var(--accent-cyan)] opacity-20 blur-xl group-focus-within:opacity-40 transition-opacity rounded-full"></div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入关键词以扫描网格..."
          className="relative w-full bg-[rgba(3,5,13,0.8)] border border-[var(--border-light)] text-[var(--text-bright)] py-4 px-8 rounded-full text-lg font-mono focus:outline-none focus:border-[var(--accent-cyan)] focus:shadow-[0_0_20px_rgba(25,247,255,0.2)] transition-all placeholder-[var(--text-muted)]"
          autoFocus
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[var(--accent-cyan)] font-mono text-xs tracking-widest">
          SCAN
        </div>
      </div>

      {/* Results */}
      <div className="space-y-8">
        {query && (
          <div className="text-[var(--text-muted)] text-sm font-mono mb-6 pb-2 border-b border-[rgba(255,255,255,0.1)]">
            &gt; Found {results.length} matches for "{query}"...
          </div>
        )}

        {results.map((result) => (
          <div
            key={result.slug}
            className="group border-l-2 border-[rgba(255,255,255,0.1)] hover:border-[var(--accent-cyan)] pl-6 py-2 transition-all duration-300"
          >
            <Link href={`/post/${result.slug}`} className="block no-underline">
              <h3 className="text-xl text-[var(--text-bright)] font-display mb-2 group-hover:text-[var(--accent-cyan)] transition-colors">
                {result.title}
              </h3>
              <p className="text-[var(--text-soft)] text-sm leading-relaxed">
                {result.excerpt}
              </p>
              <div className="mt-2 flex gap-4 text-xs font-mono text-[var(--text-muted)]">
                <span>{result.date}</span>
                <span className="text-[var(--accent-amber)]">{result.category}</span>
              </div>
            </Link>
          </div>
        ))}

        {!query && (
          <div className="text-center text-[var(--text-muted)] mt-20 opacity-50">
            [ 等待输入 ]
          </div>
        )}
      </div>
    </>
  );
}
