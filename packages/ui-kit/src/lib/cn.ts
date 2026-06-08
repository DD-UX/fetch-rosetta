type ClassValue = string | number | null | false | undefined;

/**
 * Joins class names, skipping falsy values.
 * Dependency-free stand-in for clsx; swap for clsx + tailwind-merge
 * if class-conflict resolution becomes necessary.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
