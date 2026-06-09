"use client";

import { useCharacters } from "../hooks/use-characters.hook";
import {
  CharacterListView,
  type CharacterListViewElementProps,
} from "@/features/common/components/CharacterListView";

/**
 * Passthrough props for a `CharacterList`: the view's element props only, since
 * the data fields are supplied by each strategy itself (here from the hook).
 */
export type CharacterListProps = CharacterListViewElementProps;

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
