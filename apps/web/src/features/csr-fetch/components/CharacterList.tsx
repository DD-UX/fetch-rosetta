"use client";

import { useCharacters } from "../hooks/use-characters.hook";
import {
  CharacterListView,
  type CharacterListViewProps,
} from "@/features/common/components/CharacterListView";

/**
 * Passthrough props for a `CharacterList`: every `CharacterListView` prop except
 * the data fields, which each strategy supplies itself (here from the hook).
 */
export type CharacterListProps = Omit<
  CharacterListViewProps,
  "status" | "characters" | "error"
>;

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
