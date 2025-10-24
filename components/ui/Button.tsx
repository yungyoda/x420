"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export type ButtonVariant = "default" | "primary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
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
  ({ className, variant = "default", size = "md", children, disabled, asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const composedClassName = classNames(
      variantClasses[variant],
      sizeClasses[size],
      disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      "inline-flex items-center justify-center font-medium transition",
      className
    );

    const sharedProps = asChild ? props : { ...props, disabled, type };

    return (
      <Comp
        ref={ref as React.Ref<any>}
        className={composedClassName}
        {...sharedProps}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;



