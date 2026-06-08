import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Character } from "@fetch-rosetta/sdk";
import { useCharacters } from "./use-characters";
import { fetchCharacters } from "../helpers/characters-client";

vi.mock("../helpers/characters-client", () => ({
  fetchCharacters: vi.fn(),
}));

const fetchCharactersMock = vi.mocked(fetchCharacters);

function makeCharacter(overrides: Partial<Character> = {}): Character {
  return {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "https://example.com/1.jpeg",
    episode: [],
    url: "",
    created: "",
    ...overrides,
  };
}

describe("useCharacters", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("positive", () => {
    it("starts in the loading state", () => {
      fetchCharactersMock.mockReturnValue(new Promise(() => {}));
      const { result } = renderHook(() => useCharacters());
      expect(result.current.status).toBe("loading");
      expect(result.current.characters).toEqual([]);
    });

    it("exposes the characters once the fetch resolves", async () => {
      const characters = [makeCharacter({ id: 1, name: "Rick Sanchez" })];
      fetchCharactersMock.mockResolvedValue(characters);

      const { result } = renderHook(() => useCharacters());

      await waitFor(() => expect(result.current.status).toBe("success"));
      expect(result.current.characters).toEqual(characters);
      expect(result.current.error).toBeNull();
    });
  });

  describe("negative", () => {
    it("surfaces an error when the fetch rejects", async () => {
      fetchCharactersMock.mockRejectedValue(new Error("network down"));

      const { result } = renderHook(() => useCharacters());

      await waitFor(() => expect(result.current.status).toBe("error"));
      expect(result.current.error?.message).toBe("network down");
      expect(result.current.characters).toEqual([]);
    });

    it("ignores a resolved response after unmount", async () => {
      let resolve: (value: Character[]) => void = () => {};
      fetchCharactersMock.mockReturnValue(
        new Promise<Character[]>((res) => {
          resolve = res;
        }),
      );

      const { result, unmount } = renderHook(() => useCharacters());
      unmount();
      resolve([makeCharacter()]);

      // State stays at the last value seen before unmount; no throw on update.
      expect(result.current.status).toBe("loading");
    });
  });
});
