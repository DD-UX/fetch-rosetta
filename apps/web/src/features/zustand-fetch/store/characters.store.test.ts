import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { REQUEST_STATUS, type Character } from "@fetch-rosetta/sdk";
import { useCharactersStore } from "./characters.store";
import { fetchCharacters } from "@/features/common/helpers/characters.helpers";
import { makeCharacter } from "@/features/common/helpers/character.helpers";

vi.mock("@/features/common/helpers/characters.helpers", () => ({
  fetchCharacters: vi.fn(),
}));

const fetchCharactersMock = vi.mocked(fetchCharacters);

// The store is a module singleton, so reset it between cases to keep them
// isolated — the equivalent of Testing Library's render cleanup for hooks.
const initialState = useCharactersStore.getState();

describe("useCharactersStore", () => {
  beforeEach(() => {
    useCharactersStore.setState(initialState, true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("positive", () => {
    it("starts in the loading state with no characters", () => {
      const { status, characters, error } = useCharactersStore.getState();
      expect(status).toBe(REQUEST_STATUS.loading);
      expect(characters).toEqual([]);
      expect(error).toBeNull();
    });

    it("stores the characters once the fetch resolves", async () => {
      const characters = [makeCharacter({ id: 1, name: "Rick Sanchez" })];
      fetchCharactersMock.mockResolvedValue(characters);

      await useCharactersStore.getState().load();

      const state = useCharactersStore.getState();
      expect(state.status).toBe(REQUEST_STATUS.success);
      expect(state.characters).toEqual(characters);
      expect(state.error).toBeNull();
    });
  });

  describe("negative", () => {
    it("surfaces an error when the fetch rejects", async () => {
      fetchCharactersMock.mockRejectedValue(new Error("network down"));

      await useCharactersStore.getState().load();

      const state = useCharactersStore.getState();
      expect(state.status).toBe(REQUEST_STATUS.error);
      expect(state.error?.message).toBe("network down");
      expect(state.characters).toEqual([]);
    });

    it("does not surface an error when the request is aborted", async () => {
      const controller = new AbortController();
      fetchCharactersMock.mockImplementation((signal?: AbortSignal) => {
        return new Promise<Character[]>((_, reject) => {
          signal?.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        });
      });

      const pending = useCharactersStore.getState().load(controller.signal);
      controller.abort();
      await pending;

      const state = useCharactersStore.getState();
      expect(state.status).toBe(REQUEST_STATUS.loading);
      expect(state.error).toBeNull();
    });
  });
});
