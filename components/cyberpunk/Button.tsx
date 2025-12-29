import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isVerifying?: boolean;
  verifyingText?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  href?: string;
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  isVerifying = false, 
  verifyingText,
  className = "",
  variant = "primary",
  href,
  fullWidth = true,
  ...props
}: NeonButtonProps) {
  
  const variantStyles = {
    primary: "border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-core)] hover:shadow-[0_0_30px_var(--accent-cyan-dim)] bg-[rgba(25,247,255,0.05)]",
    secondary: "border-[var(--accent-magenta)] text-[var(--accent-magenta)] hover:bg-[var(--accent-magenta)] hover:text-[var(--bg-core)] hover:shadow-[0_0_30px_rgba(255,79,216,0.2)] bg-[rgba(255,79,216,0.05)]",
    danger: "border-[var(--accent-red)] text-[var(--accent-red)] hover:bg-[var(--accent-red)] hover:text-[var(--bg-core)] hover:shadow-[0_0_30px_rgba(255,60,60,0.2)] bg-[rgba(255,60,60,0.05)]",
    ghost: "border-[var(--text-muted)] text-[var(--text-muted)] hover:border-[var(--text-bright)] hover:text-[var(--text-bright)] hover:bg-[rgba(255,255,255,0.05)] bg-transparent"
  };

  const baseClasses = `
    ${fullWidth ? "w-full" : "inline-block px-8"} py-5 border
    font-display text-base tracking-[0.2em] uppercase 
    cursor-pointer relative overflow-hidden transition-all duration-300 
    disabled:opacity-70 disabled:cursor-not-allowed
    group
    ${variantStyles[variant]}
    ${className}
  `;

  const clipPathStyle = {
    clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
  };

  const content = (
    <>
       {/* Button Shuttle Effect - Only for primary/secondary/danger */}
       {variant !== 'ghost' && (
         <div 
           className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.4)] to-transparent skew-x-[-20deg]"
           style={{ animation: isVerifying ? "none" : "shuttle-pass 3s infinite ease-in-out" }}
         />
       )}
       {isVerifying ? verifyingText : children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} style={clipPathStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      disabled={isVerifying || props.disabled}
      className={baseClasses}
      style={clipPathStyle}
      {...props}
    >
      {content}
    </button>
  );
}
