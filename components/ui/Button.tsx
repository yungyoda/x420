"use client";

import * as React from "react";

export type ButtonVariant = "default" | "primary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function classNames(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "glass-button border border-white/10 bg-white/5 hover:bg-white/10 text-white",
  primary: "glass-button border border-cyan-300/30 bg-cyan-400/25 hover:bg-cyan-400/35 text-white",
  danger: "glass-button border border-rose-300/30 bg-rose-400/25 hover:bg-rose-400/35 text-white",
  ghost: "glass-button border border-white/10 bg-transparent hover:bg-white/5 text-white/85",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          variantClasses[variant], 
          sizeClasses[size], 
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;



