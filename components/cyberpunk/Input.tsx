import { InputHTMLAttributes } from "react";

interface NeonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export function Input({ 
  id, 
  label, 
  className = "",
  ...props 
}: NeonInputProps) {
  return (
    <div className={`relative mb-8 group ${className}`}>
      <input 
        id={id} 
        autoComplete="off"
        className="
          peer w-full bg-transparent border-none border-b border-[var(--text-muted)] 
          text-[var(--text-bright)] font-mono text-lg py-2 
          transition-all duration-300 outline-none 
          focus:border-transparent
        "
        {...props}
      />
      
      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--text-muted)] overflow-hidden">
        <div className="absolute inset-0 bg-[var(--accent-cyan)] w-full -translate-x-full transition-transform duration-500 peer-focus:translate-x-0 peer-valid:translate-x-0" />
      </div>

      <label 
        htmlFor={id}
        className="
          absolute left-0 top-2 text-[var(--text-muted)] pointer-events-none 
          transition-all duration-300 uppercase text-sm tracking-[0.1em] 
          peer-focus:top-[-1.2rem] peer-focus:text-xs peer-focus:text-[var(--accent-cyan)]
          peer-valid:top-[-1.2rem] peer-valid:text-xs peer-valid:text-[var(--accent-cyan)]
        "
      >
        {label}
      </label>
    </div>
  );
}
