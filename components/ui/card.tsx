import * as React from "react";
import { cn } from "./utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "white" | "cream" | "tinted";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "white", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[28px] border-[3.5px] border-ink p-6 shadow-neo transition-all",
          {
            "bg-white": variant === "white",
            "bg-cream": variant === "cream",
            "bg-[#FFFDF5]": variant === "tinted",
          },
          className
        )}
        style={{
          boxShadow: "6px 6px 0px #1E1B4B",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
