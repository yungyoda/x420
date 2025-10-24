"use client";

import * as React from "react";

export type BadgeVariant = "default" | "accent" | "muted" | "success" | "warning" | "danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "border border-white/10 bg-white/5 text-white/80",
  accent: "border border-cyan-300/20 bg-cyan-400/15 text-cyan-100",
  muted: "border border-white/10 bg-white/5 text-white/70",
  success: "border border-emerald-300/20 bg-emerald-400/15 text-emerald-100",
  warning: "border border-amber-300/20 bg-amber-400/15 text-amber-100",
  danger: "border border-rose-300/20 bg-rose-400/15 text-rose-100",
};

export function Badge({ className, children, variant = "default", icon, ...props }: BadgeProps) {
  const baseClasses = "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider";
  return (
    <span className={[variantClasses[variant], baseClasses, className].filter(Boolean).join(" ")} {...props}>
      {icon ? <span className="inline-flex items-center justify-center">{icon}</span> : null}
      <span>{children}</span>
    </span>
  );
}

export default Badge;


