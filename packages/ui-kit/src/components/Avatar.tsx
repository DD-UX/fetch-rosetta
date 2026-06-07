import type { ComponentPropsWithRef } from "react";
import { cn } from "../lib/cn";

export type AvatarSize = "sm" | "md" | "lg";

const sizeClasses: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
};

export interface AvatarProps extends ComponentPropsWithRef<"div"> {
  src?: string;
  alt?: string;
  /** Fallback shown when no image: derived initials from this name. */
  name?: string;
  size?: AvatarSize;
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function Avatar({
  src,
  alt,
  name,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-zinc-200 font-medium text-zinc-700",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {src ? (
        /* plain <img>: the kit stays framework-agnostic (no next/image dependency) */
        <img
          src={src}
          alt={alt ?? name ?? ""}
          className="size-full object-cover"
        />
      ) : name ? (
        initialsOf(name)
      ) : (
        <span aria-hidden>?</span>
      )}
    </div>
  );
}
