import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar variant="minimal" />

      <article className="max-w-[800px] mx-auto mt-[100px] mb-16 px-6">
        <header className="border-b border-[rgba(255,255,255,0.1)] pb-8 mb-12">
          <div className="flex gap-4 mb-4 flex-wrap">
            <span className="bg-[rgba(25,247,255,0.1)] text-[var(--accent-cyan)] py-1 px-2.5 text-[0.7rem] border border-[rgba(25,247,255,0.2)]">
              {post.metadata.category}
            </span>
            {post.metadata.tags.slice(0, 4).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="bg-[rgba(25,247,255,0.08)] text-[var(--text-soft)] py-1 px-2.5 text-[0.7rem] border border-[rgba(25,247,255,0.12)] no-underline hover:border-[rgba(25,247,255,0.3)] hover:text-[var(--accent-cyan)] transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <div className="flex justify-between text-[var(--text-muted)] text-sm uppercase">
            <span>来源: {post.metadata.source}</span>
            <span>日期: {post.metadata.date}</span>
            <span>文件: {slug}</span>
          </div>
        </header>

        <div>
          <post.Content />
        </div>

        <div className="mt-16 pt-8 border-t border-dashed border-[rgba(255,255,255,0.1)] text-center">
          <p className="text-[var(--text-muted)]">文件结束</p>
          <Link
            href="/"
            className="inline-block mt-4 border border-[var(--text-muted)] text-[var(--text-muted)] py-3 px-8 no-underline transition-all duration-300 uppercase hover:border-[var(--text-bright)] hover:text-[var(--text-bright)] hover:bg-[rgba(255,255,255,0.05)]"
          >
            关闭档案
          </Link>
        </div>
      </article>

      <Footer />
    </>
  );
}
