import type { ComponentPropsWithRef } from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
} from "@fetch-rosetta/ui-kit";
import { variantHref } from "@/features/common/constants/fetch-variants.constants";
import type { FetchVariant } from "@/features/common/types/fetch-variant.types";

export interface VariantCardProps extends ComponentPropsWithRef<"div"> {
  variant: FetchVariant;
}

/**
 * The ui-kit `Button` is `<button>`-only, so a real navigation CTA must be an
 * `<a>` (Next `Link`). These classes mirror the kit's primary `sm` button for
 * the link case; the disabled placeholder uses the kit `Button` directly.
 */
const ctaLinkClasses =
  "inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 bg-zinc-900 text-white hover:bg-zinc-700";

export function VariantCard({
  variant,
  className,
  ...props
}: VariantCardProps) {
  return (
    <Card className={cn("flex flex-col", className)} {...props}>
      <CardHeader>
        <div className="flex flex-col gap-2">
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
          <Link href={variantHref(variant)} className={ctaLinkClasses}>
            Open variant
          </Link>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Open variant
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
