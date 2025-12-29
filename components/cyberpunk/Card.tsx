import { ReactNode } from "react";
import { MechanicalDecor } from "./MechanicalDecor";

interface CardProps {
  children: ReactNode;
  className?: string;
  decorated?: boolean;
}

export function Card({ children, className = "", decorated = true }: CardProps) {
  return (
    <div 
      className={`
        relative bg-[var(--bg-panel-solid)] 
        border border-[var(--border-light)]
        shadow-[0_0_100px_rgba(0,0,0,0.8)]
        p-7 sm:p-8 md:p-10
        ${className}
      `}
      style={{
        clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
      }}
    >
      {decorated && <MechanicalDecor />}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
