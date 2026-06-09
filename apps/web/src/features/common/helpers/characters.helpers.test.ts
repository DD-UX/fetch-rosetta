import { afterEach, describe, expect, it, vi } from "vitest";
import { createHttpClient } from "@fetch-rosetta/sdk";
import {
  CHARACTERS_API_PATH,
  RICK_AND_MORTY_BASE_URL,
  fetchCharacters,
} from "./characters.helpers";
import { makeCharacter } from "@/features/common/helpers/character.helpers";

const { getMock } = vi.hoisted(() => ({ getMock: vi.fn() }));

vi.mock("@fetch-rosetta/sdk", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@fetch-rosetta/sdk")>();
  return {
    ...actual,
    createHttpClient: vi.fn(() => ({
      get: getMock,
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    })),
  };
});

describe("fetchCharacters", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("wires up the SDK client once for the Rick & Morty origin", () => {
    expect(createHttpClient).toHaveBeenCalledWith({
      baseUrl: RICK_AND_MORTY_BASE_URL,
    });
  });

  describe("positive", () => {
    it("returns the results array from the character list response", async () => {
      const characters = [makeCharacter({ id: 1, name: "Rick Sanchez" })];
      getMock.mockResolvedValue({
        info: { count: 1, pages: 1, next: null, prev: null },
        results: characters,
      });

      await expect(fetchCharacters()).resolves.toEqual(characters);
      expect(getMock).toHaveBeenCalledWith(CHARACTERS_API_PATH, undefined, {
        signal: undefined,
      });
    });

    it("forwards an abort signal to the SDK when one is provided", async () => {
      getMock.mockResolvedValue({
        info: { count: 0, pages: 1, next: null, prev: null },
        results: [],
      });
      const controller = new AbortController();

      await fetchCharacters(controller.signal);

      expect(getMock).toHaveBeenCalledWith(CHARACTERS_API_PATH, undefined, {
        signal: controller.signal,
      });
    });
  });

  describe("negative", () => {
    it("propagates the error when the request fails", async () => {
      getMock.mockRejectedValue(new Error("boom"));

      await expect(fetchCharacters()).rejects.toThrow("boom");
    });
  });
});
