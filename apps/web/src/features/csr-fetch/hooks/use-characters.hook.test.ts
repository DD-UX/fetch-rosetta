import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { REQUEST_STATUS, type Character } from "@fetch-rosetta/sdk";
import { useCharacters } from "./use-characters.hook";
import { fetchCharacters } from "../helpers/characters-client.helpers";

vi.mock("../helpers/characters-client.helpers", () => ({
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
      expect(result.current.status).toBe(REQUEST_STATUS.loading);
      expect(result.current.characters).toEqual([]);
    });

    it("exposes the characters once the fetch resolves", async () => {
      const characters = [makeCharacter({ id: 1, name: "Rick Sanchez" })];
      fetchCharactersMock.mockResolvedValue(characters);

      const { result } = renderHook(() => useCharacters());

      await waitFor(() =>
        expect(result.current.status).toBe(REQUEST_STATUS.success),
      );
      expect(result.current.characters).toEqual(characters);
      expect(result.current.error).toBeNull();
    });
  });

  describe("negative", () => {
    it("surfaces an error when the fetch rejects", async () => {
      fetchCharactersMock.mockRejectedValue(new Error("network down"));

      const { result } = renderHook(() => useCharacters());

      await waitFor(() =>
        expect(result.current.status).toBe(REQUEST_STATUS.error),
      );
      expect(result.current.error?.message).toBe("network down");
      expect(result.current.characters).toEqual([]);
    });

    it("aborts the in-flight request on unmount", async () => {
      let receivedSignal: AbortSignal | undefined;
      fetchCharactersMock.mockImplementation((signal?: AbortSignal) => {
        receivedSignal = signal;
        return new Promise<Character[]>(() => {});
      });

      const { result, unmount } = renderHook(() => useCharacters());
      expect(receivedSignal?.aborted).toBe(false);

      unmount();

      // The effect cleanup aborts the controller; state never advances.
      expect(receivedSignal?.aborted).toBe(true);
      expect(result.current.status).toBe(REQUEST_STATUS.loading);
    });

    it("does not surface an error when the request is aborted", async () => {
      fetchCharactersMock.mockImplementation((signal?: AbortSignal) => {
        return new Promise<Character[]>((_, reject) => {
          signal?.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        });
      });

      const { result, unmount } = renderHook(() => useCharacters());
      unmount();

      expect(result.current.status).toBe(REQUEST_STATUS.loading);
      expect(result.current.error).toBeNull();
    });
  });
});
