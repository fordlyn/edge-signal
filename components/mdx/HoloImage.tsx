import type { ImgHTMLAttributes } from "react";

type HoloImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  caption?: string;
};

export default function HoloImage({ caption, alt, ...imgProps }: HoloImageProps) {
  if (!alt) {
    throw new Error("HoloImage requires an alt attribute");
  }

  return (
    <figure className="my-10">
      <div
        className="relative overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[var(--bg-panel-solid)]"
        style={{
          clipPath:
            "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
        }}
      >
        <div aria-hidden className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-cyan)]/40" />
        <div aria-hidden className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-cyan)]/40" />

        <img
          {...imgProps}
          alt={alt}
          className={`block w-full h-auto object-cover ${imgProps.className ?? ""}`}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.30) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))",
            backgroundSize: "100% 2px, 3px 100%",
          }}
        />
      </div>

      {caption && (
        <figcaption className="mt-3 flex items-center gap-2 font-mono text-xs text-[var(--accent-cyan)] opacity-80">
          <span aria-hidden className="inline-block h-1.5 w-1.5 bg-[var(--accent-cyan)] rotate-45" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
