import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "./utils";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{
          x: -1,
          y: -1,
          boxShadow: "5px 5px 0px #1E1B4B",
        }}
        whileTap={{
          x: 4,
          y: 4,
          boxShadow: "0px 0px 0px #1E1B4B",
        }}
        initial={{
          boxShadow: "4px 4px 0px #1E1B4B",
        }}
        className={cn(
          "relative inline-flex items-center justify-center font-comfortaa font-bold rounded-pill border-[3.5px] border-[#1E1B4B] transition-colors focus:outline-none",
          {
            "bg-primary-container text-[#1E1B4B]": variant === "primary",
            "bg-secondary-container text-white": variant === "secondary",
            "bg-tertiary-container text-white": variant === "tertiary",
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        style={{
          boxShadow: "inset 0 3px 0 rgba(255, 255, 255, 0.5)",
        }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
