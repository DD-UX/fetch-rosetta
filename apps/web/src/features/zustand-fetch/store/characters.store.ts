import { create } from "zustand";
import {
  REQUEST_STATUS,
  type Character,
  type RequestStatus,
} from "@fetch-rosetta/sdk";
import { fetchCharacters } from "@/features/common/helpers/characters.helpers";

export interface CharactersState {
  status: RequestStatus;
  characters: Character[];
  error: Error | null;
  /**
   * Loads characters into the store. Accepts an optional `AbortSignal` so the
   * caller can cancel an in-flight request (e.g. on unmount); aborts are
   * intentional and never surfaced as errors, mirroring the CSR hook.
   */
  load: (signal?: AbortSignal) => Promise<void>;
}

/**
 * Zustand variant: the same character data, held in a lightweight external
 * store instead of component state. The store owns the request lifecycle and
 * reports it through the shared `REQUEST_STATUS` vocabulary, so any component
 * can subscribe and render the data-source-agnostic `CharacterListView`.
 */
export const useCharactersStore = create<CharactersState>((set) => ({
  status: REQUEST_STATUS.loading,
  characters: [],
  error: null,
  load: async (signal) => {
    set({ status: REQUEST_STATUS.loading, error: null });
    try {
      const characters = await fetchCharacters(signal);
      set({ characters, status: REQUEST_STATUS.success });
    } catch (cause) {
      if (signal?.aborted) return;
      set({
        error: cause instanceof Error ? cause : new Error("Unknown error"),
        status: REQUEST_STATUS.error,
      });
    }
  },
}));
