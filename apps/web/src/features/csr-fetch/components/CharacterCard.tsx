import type { ComponentPropsWithRef } from "react";
import type { Character, CharacterStatus } from "@fetch-rosetta/sdk";
import {
  Avatar,
  Badge,
  type BadgeVariant,
  Card,
  CardContent,
  cn,
} from "@fetch-rosetta/ui-kit";

export interface CharacterCardProps extends ComponentPropsWithRef<"div"> {
  character: Character;
}

const statusBadgeVariant: Record<CharacterStatus, BadgeVariant> = {
  Alive: "success",
  Dead: "destructive",
  unknown: "secondary",
};

export function CharacterCard({
  character,
  className,
  ...props
}: CharacterCardProps) {
  return (
    <Card className={cn("h-full", className)} {...props}>
      <CardContent className="flex items-center gap-3 p-4 pt-4">
        <Avatar src={character.image} name={character.name} size="lg" />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="truncate font-medium">{character.name}</p>
          <p className="truncate text-sm text-zinc-500">{character.species}</p>
          <Badge variant={statusBadgeVariant[character.status]}>
            {character.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
