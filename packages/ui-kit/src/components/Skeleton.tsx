import { cn } from "../lib/cn";

export type SkeletonProps = React.ComponentPropsWithRef<"div">;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-md bg-zinc-200", className)}
      {...props}
    />
  );
}
