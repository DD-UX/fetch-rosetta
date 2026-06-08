import type { ComponentPropsWithRef } from "react";
import { cn } from "@fetch-rosetta/ui-kit";
import { FETCH_VARIANTS } from "@/features/common/constants/fetch-variants";
import { VariantCard } from "./VariantCard";

export type VariantListProps = ComponentPropsWithRef<"ul">;

export function VariantList({ className, ...props }: VariantListProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    >
      {FETCH_VARIANTS.map((variant) => (
        <li key={variant.id}>
          <VariantCard variant={variant} className="h-full" />
        </li>
      ))}
    </ul>
  );
}
