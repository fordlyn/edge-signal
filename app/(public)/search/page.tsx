import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllPosts } from "@/lib/posts";

import SearchClient from "./search-client";

export default async function SearchPage() {
  const posts = await getAllPosts();

  return (
    <>
      <div className="grid-floor"></div>
      <Navbar />

      <main className="min-h-screen max-w-[800px] mx-auto pt-32 pb-20 px-6">
        <header className="mb-12 text-center">
          <h1 className="font-display text-3xl text-[var(--text-bright)] mb-2">
            信号检索 <span className="text-[var(--accent-cyan)]">// SEARCH</span>
          </h1>
        </header>

        <SearchClient
          posts={posts.map((p) => ({
            slug: p.slug,
            title: p.metadata.title,
            excerpt: p.metadata.excerpt,
            tags: p.metadata.tags,
            category: p.metadata.category,
            date: p.metadata.date,
          }))}
        />
      </main>

      <Footer />
    </>
  );
}
