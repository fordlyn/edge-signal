import { notFound } from "next/navigation";

import Link from "next/link";

import { Card } from "@/components/cyberpunk/Card";
import { Button } from "@/components/cyberpunk/Button";
import { DeepSpaceBackground } from "@/components/cyberpunk/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllPosts } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  for (const post of posts) {
    for (const tag of post.metadata.tags) {
      tags.add(tag);
    }
  }

  return [...tags].sort().map((tag) => ({ tag }));
}

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default async function TagDetailPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  // In practice, dynamic route params may arrive URL-encoded.
  // Decode + normalize to ensure Chinese tags (e.g. "霓虹") match reliably.
  const tagValue = safeDecodeURIComponent(tag).normalize("NFC");

  const posts = await getAllPosts();
  const filtered = posts.filter((p) => p.metadata.tags.some((t) => t.normalize("NFC") === tagValue));

  if (filtered.length === 0) {
    notFound();
  }

  return (
    <>
      <DeepSpaceBackground />
      <Navbar />

      <main className="min-h-screen max-w-[800px] mx-auto pt-32 pb-20 px-6">
        <header className="mb-16 border-b border-[rgba(255,255,255,0.1)] pb-8">
          <div className="text-[var(--accent-cyan)] text-xs font-mono mb-2 uppercase tracking-widest">
            Frequency Locked
          </div>
          <h1 className="font-display text-4xl text-[var(--text-bright)] mb-4 flex items-center gap-4">
            <span className="text-[var(--text-muted)] opacity-50">#</span>
            {tagValue}
          </h1>
          <p className="text-[var(--text-muted)] font-mono text-sm">
            Matched Signals: {filtered.length}
          </p>
        </header>

        <div className="space-y-8">
          {filtered.map((post) => (
            <Card
              key={post.slug}
              className="p-0 overflow-hidden"
              decorated={false}
            >
              {/* Card Image Placeholder */}
              <div className="h-[160px] bg-[#111] relative overflow-hidden border-b border-[rgba(255,255,255,0.05)]">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      rgba(25, 247, 255, 0.03) 0px,
                      rgba(25, 247, 255, 0.03) 1px,
                      transparent 1px,
                      transparent 10px
                    )`
                  }}
                />
              </div>

              <div className="pt-8">
                <div className="text-xs text-[var(--accent-magenta)] mb-3 flex gap-4 uppercase tracking-[0.1em]">
                  <span>:: {post.metadata.category} ::</span>
                  <span>{post.metadata.source}</span>
                </div>

                <h2 className="m-0 mb-4 text-2xl font-[var(--font-display)] leading-tight">
                  <Link 
                    href={`/post/${post.slug}`}
                    className="text-[var(--text-bright)] no-underline transition-colors duration-300 hover:text-[var(--accent-cyan)]"
                  >
                    {post.metadata.title}
                  </Link>
                </h2>

                <p className="text-[var(--text-soft)] leading-relaxed text-[0.95rem] mb-6">
                  {post.metadata.excerpt}
                </p>

                <Button href={`/post/${post.slug}`} variant="primary" fullWidth={false} className="py-2.5 px-6 text-xs">
                  访问文件 &gt;&gt;
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
