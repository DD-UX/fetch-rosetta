import { cn } from "../lib/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.ComponentPropsWithRef<"select">, "children"> {
  options: SelectOption[];
  /** Optional placeholder rendered as a disabled first option. */
  placeholder?: string;
  error?: string;
}

export function Select({
  options,
  placeholder,
  error,
  className,
  id,
  defaultValue,
  ...props
}: SelectProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div className="flex w-full flex-col gap-1">
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
        className={cn(
          "h-10 w-full appearance-none rounded-md border bg-white px-3 text-sm text-zinc-900 shadow-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-zinc-300 focus-visible:ring-zinc-400",
          className,
        )}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
