import Link from "next/link";

import { Card } from "@/components/cyberpunk/Card";
import { Button } from "@/components/cyberpunk/Button";
import { DeepSpaceBackground } from "@/components/cyberpunk/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 4);

  const tagCount = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.metadata.tags) {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
    }
  }

  const topTags = [...tagCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  return (
    <>
      <DeepSpaceBackground />

      <Navbar />

      {/* Hero Section */}
      <header className="mt-[70px] py-24 pb-16 border-b border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1200px] w-[92vw] mx-auto">
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight m-0 mb-6 uppercase max-w-[800px]">
            观测 <span className="text-[var(--accent-cyan)]">数字边疆</span>
          </h1>
          <p className="max-w-[600px] text-lg text-[var(--text-soft)] leading-relaxed mb-10">
            截获来自外层网格的信号碎片。记录流氓协议、合成文化与机器幽灵交织的瞬间。
          </p>

          <div className="flex gap-12 mt-12 pt-8 border-t border-dashed border-[rgba(255,255,255,0.1)]">
            <div>
              <span className="block text-2xl font-display text-[var(--text-bright)]">
                42.8 THz
              </span>
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-[0.1em]">
                带宽
              </label>
            </div>
            <div>
              <span className="block text-2xl font-display text-[var(--text-bright)]">
                8,902
              </span>
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-[0.1em]">
                活跃节点
              </label>
            </div>
            <div>
              <span className="block text-2xl font-display text-[var(--accent-magenta)]">
                稳定
              </span>
              <label className="text-xs text-[var(--text-muted)] uppercase tracking-[0.1em]">
                系统状态
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1200px] w-[92vw] mx-auto grid grid-cols-[2fr_1fr] gap-8 py-16">
        <main>
          <div className="flex items-center justify-between mb-8 border-b border-[var(--border-light)] pb-2">
            <div className="font-display text-lg text-[var(--accent-cyan)] uppercase tracking-[0.1em]">
              最新解密
            </div>
            <Link
              href="/archive"
              className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
            >
              查看全部 →
            </Link>
          </div>

          {latestPosts.map((post) => (
            <Card
              key={post.slug}
              className="mb-8 p-0 overflow-hidden hover:-translate-y-1.5 transition-transform duration-300 group"
              decorated={false}
            >
                {/* Card Image Placeholder */}
                <div className="h-[200px] bg-[#111] relative overflow-hidden border-b border-[rgba(255,255,255,0.05)]">
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
        </main>

        <aside>
          <div className="bg-[var(--bg-panel)] border border-[rgba(255,255,255,0.05)] p-6 mb-8">
            <h3 className="m-0 mb-4 text-sm text-[var(--text-muted)] uppercase tracking-[0.2em] border-b border-[rgba(255,255,255,0.1)] pb-2">
              系统标签
            </h3>
            <div className="flex flex-wrap gap-2">
              {topTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="bg-[rgba(255,255,255,0.05)] py-1.5 px-2.5 text-xs text-[var(--text-soft)] no-underline transition-all duration-200 hover:bg-[var(--accent-cyan)] hover:text-black"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex gap-3 text-xs">
              <Link
                href="/tags"
                className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
              >
                频段索引
              </Link>
              <span className="opacity-30">|</span>
              <Link
                href="/categories"
                className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
              >
                分区索引
              </Link>
              <span className="opacity-30">|</span>
              <Link
                href="/search"
                className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
              >
                信号检索
              </Link>
            </div>
          </div>

          <div className="bg-[var(--bg-panel)] border border-[rgba(255,255,255,0.05)] p-6 mb-8">
            <h3 className="m-0 mb-4 text-sm text-[var(--text-muted)] uppercase tracking-[0.2em] border-b border-[rgba(255,255,255,0.1)] pb-2">
              近期上行链路
            </h3>
            <ul className="list-none p-0 m-0 text-sm">
              {[
                { text: "用户_992 已验证", time: "0m 前" },
                { text: "信号追踪完成", time: "2m 前" },
                { text: "防火墙补丁已应用", time: "15m 前" },
                { text: "发现新节点", time: "1h 前" },
              ].map((log, i) => (
                <li
                  key={i}
                  className="py-2 border-b border-dashed border-[rgba(255,255,255,0.05)] text-[var(--text-soft)] flex justify-between"
                >
                  {log.text}{" "}
                  <span className="text-[var(--accent-amber)]">{log.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
}
