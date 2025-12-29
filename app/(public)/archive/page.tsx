import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllPosts } from "@/lib/posts";

type ArchiveGroup = {
  year: string;
  months: {
    month: string;
    posts: { title: string; date: string; slug: string }[];
  }[];
};

function buildArchive(posts: Awaited<ReturnType<typeof getAllPosts>>): ArchiveGroup[] {
  const yearMap = new Map<string, Map<string, { title: string; date: string; slug: string }[]>>();

  for (const post of posts) {
    const [year, month] = post.metadata.date.split("-");
    const monthKey = month ?? "01";

    if (!yearMap.has(year)) yearMap.set(year, new Map());
    const monthMap = yearMap.get(year)!;

    if (!monthMap.has(monthKey)) monthMap.set(monthKey, []);
    monthMap.get(monthKey)!.push({
      title: post.metadata.title,
      date: post.metadata.date,
      slug: post.slug,
    });
  }

  return [...yearMap.entries()]
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, monthMap]) => ({
      year,
      months: [...monthMap.entries()]
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([month, monthPosts]) => ({
          month,
          posts: monthPosts.sort((a, b) => b.date.localeCompare(a.date)),
        })),
    }));
}

export default async function ArchivePage() {
  const posts = await getAllPosts();
  const archive = buildArchive(posts);

  return (
    <>
      <div className="grid-floor"></div>
      <Navbar />

      <main className="min-h-screen max-w-[800px] mx-auto pt-32 pb-20 px-6">
        <header className="mb-16 border-b border-[rgba(255,255,255,0.1)] pb-8">
          <h1 className="font-display text-4xl text-[var(--text-bright)] mb-4">
            信号归档{" "}
            <span className="text-[var(--accent-cyan)]">// ARCHIVE</span>
          </h1>
          <p className="text-[var(--text-muted)] font-mono text-sm">
            Total Logs: {posts.length}
          </p>
        </header>

        <div className="relative border-l border-[rgba(255,255,255,0.1)] ml-4 pl-8 space-y-16">
          <div className="absolute top-0 bottom-0 left-[-1px] w-[1px] bg-gradient-to-b from-[var(--accent-cyan)] via-transparent to-transparent opacity-50"></div>

          {archive.map((yearGroup) => (
            <div key={yearGroup.year} className="relative">
              <div className="absolute -left-[41px] top-0 flex items-center justify-center w-[18px] h-[18px] bg-[var(--bg-core)] border border-[var(--accent-cyan)] rounded-full z-10">
                <div className="w-1.5 h-1.5 bg-[var(--accent-cyan)] rounded-full animate-pulse"></div>
              </div>

              <h2 className="font-display text-2xl text-[var(--accent-cyan)] mb-8 flex items-center gap-4">
                {yearGroup.year}
                <span className="h-[1px] bg-[var(--accent-cyan)] opacity-20 flex-grow"></span>
              </h2>

              <div className="space-y-10">
                {yearGroup.months.map((monthGroup) => (
                  <div key={monthGroup.month}>
                    <div className="flex gap-6">
                      <div className="font-mono text-[var(--text-muted)] text-sm pt-1 w-12 text-right opacity-70">
                        {monthGroup.month}月
                      </div>
                      <div className="flex-grow space-y-6">
                        {monthGroup.posts.map((post) => (
                          <div key={post.slug} className="group relative">
                            <div className="absolute -left-[45px] top-2.5 w-2 h-2 bg-[var(--text-muted)] rounded-full opacity-20 group-hover:bg-[var(--accent-cyan)] group-hover:opacity-100 transition-all duration-300"></div>

                            <Link
                              href={`/post/${post.slug}`}
                              className="block no-underline group-hover:translate-x-2 transition-transform duration-300"
                            >
                              <h3 className="text-lg text-[var(--text-soft)] group-hover:text-[var(--text-bright)] transition-colors mb-1">
                                {post.title}
                              </h3>
                              <time className="text-xs text-[var(--text-muted)] font-mono">
                                {post.date}
                              </time>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
