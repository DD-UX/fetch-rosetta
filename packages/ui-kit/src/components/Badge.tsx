import type { ComponentPropsWithRef } from "react";
import { cn } from "../lib/cn";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "destructive";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-zinc-900 text-white",
  secondary: "bg-zinc-100 text-zinc-700",
  outline: "border border-zinc-300 text-zinc-700",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  destructive: "bg-red-100 text-red-800",
};

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium self-start capitalize",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
