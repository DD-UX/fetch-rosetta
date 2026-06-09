"use client";

import type { ComponentPropsWithRef } from "react";
import { REQUEST_STATUS } from "@fetch-rosetta/sdk";
import { Alert, Skeleton, cn } from "@fetch-rosetta/ui-kit";
import { useCharacters } from "../hooks/use-characters.hook";
import { CharacterCard } from "@/features/common/components/CharacterCard";

export type CharacterListProps = ComponentPropsWithRef<"div">;

const gridClasses = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export function CharacterList({ className, ...props }: CharacterListProps) {
  const { status, characters, error } = useCharacters();

  return (
    <div className={cn(className)} {...props}>
      {status === REQUEST_STATUS.loading ? (
        <div className={gridClasses} aria-busy>
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : status === REQUEST_STATUS.error ? (
        <Alert variant="error" title="Couldn't load characters">
          {error?.message ?? "Something went wrong while fetching characters."}
        </Alert>
      ) : characters.length === 0 ? (
        <Alert variant="info" title="No characters">
          The API returned an empty list.
        </Alert>
      ) : (
        <ul className={gridClasses}>
          {characters.map((character) => (
            <li key={character.id}>
              <CharacterCard character={character} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
