import type { ComponentPropsWithRef } from "react";
import { Badge, cn } from "@fetch-rosetta/ui-kit";
import { FETCH_VARIANTS } from "@/features/common/constants/fetch-variants.constants";

export type HeroProps = ComponentPropsWithRef<"section">;

export function Hero({ className, ...props }: HeroProps) {
  return (
    <section
      className={cn("flex flex-col items-center gap-4 text-center", className)}
      {...props}
    >
      <h1 className="text-4xl font-bold tracking-tight">Fetch Rosetta</h1>
      <p className="max-w-xl text-lg text-zinc-600">
        A playground for making the same data-fetching calls many different
        React ways — so the trade-offs between architectures can be felt instead
        of read about.
      </p>
      <ul className="flex flex-wrap justify-center gap-2">
        {FETCH_VARIANTS.map((variant) => (
          <li key={variant.id}>
            <Badge variant="secondary">{variant.label}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
