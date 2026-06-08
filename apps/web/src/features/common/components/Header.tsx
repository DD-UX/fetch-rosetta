import type { ComponentPropsWithRef } from "react";
import Link from "next/link";
import { sdkInfo } from "@fetch-rosetta/sdk";
import { Badge, cn } from "@fetch-rosetta/ui-kit";

export type HeaderProps = ComponentPropsWithRef<"header">;

export function Header({ className, ...props }: HeaderProps) {
  const info = sdkInfo();

  return (
    <header
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    >
      <nav className="flex items-center gap-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900"
        >
          fetch-rosetta
        </Link>
        <Link
          href="/rosetta"
          className="text-sm text-zinc-500 hover:text-zinc-900"
        >
          Variants
        </Link>
      </nav>
      <Badge variant="secondary">
        SDK wired: {info.name} v{info.version}
      </Badge>
    </header>
  );
}
