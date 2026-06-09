"use client";

import { useEffect } from "react";
import { useCharactersStore } from "../store/characters.store";
import {
  CharacterListView,
  type CharacterListViewElementProps,
} from "@/features/common/components/CharacterListView";

/**
 * Client Component for the Zustand variant: subscribes to the external store
 * and kicks off the load on mount, cancelling the in-flight request on unmount
 * via an `AbortController`. Rendering is delegated to the shared, data-source
 * agnostic `CharacterListView`, so the only Zustand-specific concern here is
 * wiring the store to the view.
 */
export function CharacterList(props: CharacterListViewElementProps) {
  const status = useCharactersStore((state) => state.status);
  const characters = useCharactersStore((state) => state.characters);
  const error = useCharactersStore((state) => state.error);
  const load = useCharactersStore((state) => state.load);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => {
      controller.abort();
    };
  }, [load]);

  return (
    <CharacterListView
      status={status}
      characters={characters}
      error={error}
      {...props}
    />
  );
}
