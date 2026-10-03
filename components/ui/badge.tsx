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
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-comfortaa font-bold text-xs border-[2.5px] border-[#1E1B4B]",
          {
            "bg-[#FFD93D] text-[#1E1B4B]": variant === "primary",
            "bg-[#FF6B9D] text-white": variant === "secondary",
            "bg-[#6BE585] text-[#1E1B4B]": variant === "mint",
            "bg-[#4CC9F0] text-[#1E1B4B]": variant === "sky",
            "bg-[#9B5DE5] text-white": variant === "grape",
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
