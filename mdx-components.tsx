import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Children, isValidElement } from "react";

import DataPanel from "@/components/mdx/DataPanel";
import HoloImage from "@/components/mdx/HoloImage";
import SignalAlert from "@/components/mdx/SignalAlert";
import SignalQuote from "@/components/mdx/SignalQuote";
import SystemMetric from "@/components/mdx/SystemMetric";
import TerminalBlock from "@/components/mdx/TerminalBlock";

function hasBlockLevelChild(children: unknown): boolean {
  const list = Children.toArray(children as never);

  for (const child of list) {
    if (!isValidElement(child)) continue;

    // Inline React components that are safe inside a paragraph.
    if (child.type === Link) continue;

    // HTML tags
    if (typeof child.type === "string") {
      // Treat any common block-level tags as blockers.
      if (
        ["div", "section", "article", "aside", "figure", "pre", "img"].includes(
          child.type,
        )
      ) {
        return true;
      }

      // Most other HTML tags (a, strong, em, code, span...) are inline-safe.
      continue;
    }

    // Known MDX components that are block-level.
    if (
      child.type === HoloImage ||
      child.type === DataPanel ||
      child.type === SignalAlert ||
      child.type === SignalQuote ||
      child.type === TerminalBlock ||
      child.type === SystemMetric
    ) {
      return true;
    }

    // Any other React component is considered block-level to prevent invalid HTML.
    return true;
  }

  return false;
}

const components = {
  h1: ({ children }) => (
    <h1 className="font-display text-4xl text-[var(--text-bright)] mb-8 pb-4 uppercase border-b border-[rgba(255,255,255,0.08)]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display text-2xl text-[var(--accent-cyan)] mt-12 mb-4 flex items-center gap-3">
      <span aria-hidden className="w-2 h-2 bg-[var(--accent-cyan)] rotate-45" />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-xl text-[var(--text-bright)] mt-10 mb-3 flex items-center gap-3">
      <span aria-hidden className="w-8 h-px bg-[var(--accent-cyan)]/40" />
      {children}
    </h3>
  ),
  p: ({ children }) => {
    // MDX sometimes wraps JSX blocks (figure/section/div) inside a paragraph.
    // If we render those inside <p>, the DOM becomes invalid and hydration fails.
    if (hasBlockLevelChild(children)) {
      return (
        <div className="text-[var(--text-soft)] leading-relaxed mb-6 last:mb-0 text-lg">
          {children}
        </div>
      );
    }

    return (
      <p className="text-[var(--text-soft)] leading-relaxed mb-6 last:mb-0 text-lg">
        {children}
      </p>
    );
  },
  a: ({ href, children }) => {
    if (!href) return <span>{children}</span>;

    const isExternal = href.startsWith("http://") || href.startsWith("https://");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--accent-cyan)] hover:text-[var(--text-bright)] underline underline-offset-4"
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className="text-[var(--accent-cyan)] hover:text-[var(--text-bright)] underline underline-offset-4"
      >
        {children}
      </Link>
    );
  },
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-2 text-[var(--text-soft)] text-lg mb-6 last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-2 text-[var(--text-soft)] text-lg mb-6 last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => <SignalQuote>{children}</SignalQuote>,
  pre: ({ children }) => <TerminalBlock>{children}</TerminalBlock>,
  code: ({ children, className }) => {
    if (className) {
      return <code className={className}>{children}</code>;
    }

    return (
      <code className="font-mono text-[0.95em] text-[var(--accent-amber)]">
        {children}
      </code>
    );
  },
  hr: () => (
    <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-[rgba(25,247,255,0.35)] to-transparent" />
  ),
  img: (props) => <HoloImage {...props} />,
  DataPanel,
  SignalAlert,
  SignalQuote,
  SystemMetric,
  TerminalBlock,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
