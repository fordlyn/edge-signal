import { ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "4xl" | "8xl";
}

export function GlitchText({ children, className = "", size = "8xl" }: GlitchTextProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
    "4xl": "text-8xl",
    "8xl": "text-9xl" // keeping the original massive size for 404
  };

  return (
    <div className="relative mb-8">
      <div 
        className={`
          font-display font-extrabold leading-none text-[var(--accent-red)] 
          shadow-[2px_2px_0px_var(--accent-cyan)] glitch-effect 
          ${sizeClasses[size]}
          ${className}
        `}
        data-text={children}
      >
        {children}
      </div>
    </div>
  );
}
