import * as React from "react";
import { cn } from "./utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "mint" | "sky" | "grape";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-comfortaa font-bold text-xs border-[2.5px] border-ink",
          {
            "bg-sunny text-ink": variant === "primary",
            "bg-bubblegum text-white": variant === "secondary",
            "bg-mint text-ink": variant === "mint",
            "bg-sky text-ink": variant === "sky",
            "bg-grape text-white": variant === "grape",
          },
          className
        )}
        style={{
          boxShadow: "3px 3px 0px #1E1B4B",
        }}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";
