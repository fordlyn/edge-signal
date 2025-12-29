import { readdir } from "node:fs/promises";
import path from "node:path";

import type { ComponentType } from "react";

export type PostMetadata = {
  title: string;
  date: string; // ISO: YYYY-MM-DD
  excerpt: string;
  tags: string[];
  category: string;
  source: string;
};

export type PostListItem = {
  slug: string;
  metadata: PostMetadata;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function isValidMetadata(value: unknown): value is PostMetadata {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;
  return (
    typeof record.title === "string" &&
    typeof record.date === "string" &&
    typeof record.excerpt === "string" &&
    Array.isArray(record.tags) &&
    record.tags.every((tag) => typeof tag === "string") &&
    typeof record.category === "string" &&
    typeof record.source === "string"
  );
}

export async function getPostSlugs(): Promise<string[]> {
  const entries = await readdir(POSTS_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""))
    .sort();
}

export async function getAllPosts(): Promise<PostListItem[]> {
  const slugs = await getPostSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const mod = (await import(`@/content/posts/${slug}.mdx`)) as {
        metadata?: unknown;
      };

      if (!isValidMetadata(mod.metadata)) {
        throw new Error(`Invalid metadata export in content/posts/${slug}.mdx`);
      }

      return { slug, metadata: mod.metadata };
    }),
  );

  return posts.sort((a, b) => {
    const timeA = new Date(a.metadata.date).getTime();
    const timeB = new Date(b.metadata.date).getTime();
    return timeB - timeA;
  });
}

export async function getPostBySlug(slug: string): Promise<
  | { metadata: PostMetadata; Content: ComponentType }
  | null
> {
  try {
    const mod = (await import(`@/content/posts/${slug}.mdx`)) as {
      default?: ComponentType;
      metadata?: unknown;
    };

    if (!mod.default) return null;
    if (!isValidMetadata(mod.metadata)) return null;

    return {
      Content: mod.default,
      metadata: mod.metadata,
    };
  } catch {
    return null;
  }
}
