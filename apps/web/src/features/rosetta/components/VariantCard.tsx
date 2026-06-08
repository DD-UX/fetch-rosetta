import type { ComponentPropsWithRef } from "react";
import Link from "next/link";
import {
  Badge,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
} from "@fetch-rosetta/ui-kit";
import {
  type FetchVariant,
  variantHref,
} from "@/features/common/constants/fetch-variants.constants";

export interface VariantCardProps extends ComponentPropsWithRef<"div"> {
  variant: FetchVariant;
}

/**
 * Button-like CTA styling shared by the live link and the disabled placeholder
 * so both render identically. The ui-kit `Button` is `<button>`-only, so a real
 * navigation CTA must be an `<a>` (Next `Link`) — we mirror the kit's primary
 * `sm` button here rather than nest a button inside an anchor.
 */
const ctaClasses =
  "inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2";

export function VariantCard({
  variant,
  className,
  ...props
}: VariantCardProps) {
  return (
    <Card className={cn("flex flex-col", className)} {...props}>
      <CardHeader>
        <div className="flex flex-col items-start gap-2">
          <CardTitle>{variant.label}</CardTitle>
          {variant.available ? null : (
            <Badge variant="warning" className="text-nowrap">
              Coming soon
            </Badge>
          )}
        </div>
        <CardDescription>{variant.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        {variant.available ? (
          <Link
            href={variantHref(variant)}
            className={cn(
              ctaClasses,
              "bg-zinc-900 text-white hover:bg-zinc-700",
            )}
          >
            Open variant
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className={cn(
              ctaClasses,
              "cursor-not-allowed border border-zinc-300 text-zinc-400",
            )}
          >
            Open variant
          </button>
        )}
      </CardFooter>
    </Card>
  );
}
