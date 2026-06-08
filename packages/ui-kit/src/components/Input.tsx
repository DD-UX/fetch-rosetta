import type { ComponentPropsWithRef } from "react";
import { cn } from "../lib/cn";

export interface InputProps extends ComponentPropsWithRef<"input"> {
  /** Renders the input in an error state and links the message for screen readers. */
  error?: string;
}

export function Input({ error, className, id, ...props }: InputProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div className="flex w-full flex-col gap-1">
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          "h-10 w-full rounded-md border bg-white px-3 text-sm text-zinc-900 shadow-sm transition-colors",
          "placeholder:text-zinc-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-zinc-300 focus-visible:ring-zinc-400",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
