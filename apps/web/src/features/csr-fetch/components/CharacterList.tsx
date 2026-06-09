"use client";

import type { ComponentPropsWithRef } from "react";
import { useCharacters } from "../hooks/use-characters.hook";
import { CharacterListView } from "@/features/common/components/CharacterListView";

export type CharacterListProps = ComponentPropsWithRef<"div">;

/**
 * Client Component for the CSR variant: drives the shared `CharacterListView`
 * with the state from `useCharacters`. The view is data-source agnostic, so the
 * only CSR-specific concern that lives here is the client-side fetch hook.
 */
export function CharacterList(props: CharacterListProps) {
  const { status, characters, error } = useCharacters();

  return (
    <CharacterListView
      status={status}
      characters={characters}
      error={error}
      {...props}
    />
  );
}
