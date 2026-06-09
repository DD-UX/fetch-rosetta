import { afterEach, describe, expect, it, vi } from "vitest";
import { createHttpClient } from "@fetch-rosetta/sdk";
import { fetchCharactersOnServer } from "./characters-server.helpers";
import { makeCharacter } from "@/features/csr-fetch/helpers/character.helpers";

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

describe("fetchCharactersOnServer", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("wires up the SDK client once for the Rick & Morty origin", () => {
    expect(createHttpClient).toHaveBeenCalledWith({
      baseUrl: "https://rickandmortyapi.com",
    });
  });

  describe("positive", () => {
    it("returns the results array from the character list response", async () => {
      const characters = [makeCharacter({ id: 1, name: "Rick Sanchez" })];
      getMock.mockResolvedValue({
        info: { count: 1, pages: 1, next: null, prev: null },
        results: characters,
      });

      await expect(fetchCharactersOnServer()).resolves.toEqual(characters);
      expect(getMock).toHaveBeenCalledWith("/api/character");
    });
  });

  describe("negative", () => {
    it("propagates the error when the request fails", async () => {
      getMock.mockRejectedValue(new Error("boom"));

      await expect(fetchCharactersOnServer()).rejects.toThrow("boom");
    });
  });
});
