import type { ComponentPropsWithRef } from "react";
import {
  type Character,
  type RequestStatus,
  REQUEST_STATUS,
} from "@fetch-rosetta/sdk";
import { Alert, Skeleton, cn } from "@fetch-rosetta/ui-kit";
import { CharacterCard } from "./CharacterCard";

export type CharacterListViewElementProps = ComponentPropsWithRef<"div">;

export interface CharacterListViewProps extends CharacterListViewElementProps {
  status: RequestStatus;
  characters: Character[];
  error?: Error | null;
}

const gridClasses = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

/**
 * Presentational, render-only character list shared by server-rendered
 * variants. It holds no state and does no fetching, so it stays a Server
 * Component (no `"use client"`) and is trivially unit-testable: the caller
 * decides the `status` and the view just draws the matching state.
 */
export function CharacterListView({
  status,
  characters,
  error,
  className,
  ...props
}: CharacterListViewProps) {
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
