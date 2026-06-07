import { cn } from "../lib/cn";

export interface CheckboxProps extends Omit<
  React.ComponentPropsWithRef<"input">,
  "type"
> {
  label?: string;
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const checkbox = (
    <input
      type="checkbox"
      id={id}
      className={cn(
        "size-4 shrink-0 rounded border-zinc-300 accent-zinc-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );

  if (!label) {
    return checkbox;
  }

  return (
    <label
      htmlFor={id}
      className="inline-flex cursor-pointer items-center gap-2 text-sm text-zinc-900"
    >
      {checkbox}
      {label}
    </label>
  );
}
