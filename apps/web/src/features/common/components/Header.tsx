import type { ComponentPropsWithRef } from "react";
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
      <p className="text-sm font-semibold tracking-tight text-zinc-900">
        fetch-rosetta
      </p>
      <Badge variant="secondary">
        SDK wired: {info.name} v{info.version}
      </Badge>
    </header>
  );
}
