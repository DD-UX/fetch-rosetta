import { cn } from "../lib/cn";

export type SpinnerSize = "sm" | "md" | "lg";

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-10 border-4",
};

export interface SpinnerProps extends React.ComponentPropsWithRef<"span"> {
  size?: SpinnerSize;
  /** Accessible label announced to screen readers. */
  label?: string;
}

export function Spinner({
  size = "md",
  label = "Loading",
  className,
  ...props
}: SpinnerProps) {
  return (
    <span role="status" aria-label={label} {...props}>
      <span
        aria-hidden
        className={cn(
          "block animate-spin rounded-full border-zinc-300 border-t-zinc-900",
          sizeClasses[size],
          className,
        )}
      />
    </span>
  );
}
