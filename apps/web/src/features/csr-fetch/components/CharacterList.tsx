"use client";

import { useCharacters } from "../hooks/use-characters.hook";
import {
  CharacterListView,
  type CharacterListViewElementProps,
} from "@/features/common/components/CharacterListView";

/**
 * Client Component for the CSR variant: drives the shared `CharacterListView`
 * with the state from `useCharacters`. The view is data-source agnostic, so the
 * only CSR-specific concern that lives here is the client-side fetch hook. It
 * accepts the view's element props (the data fields are supplied by the hook).
 */
export function CharacterList(props: CharacterListViewElementProps) {
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
