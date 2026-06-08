import {
  createHttpClient,
  type Character,
  type CharacterListResponse,
} from "@fetch-rosetta/sdk";

/**
 * Origin of the public Rick & Morty API. The path (`/api/character`) is passed
 * per-request so the SDK's `new URL(path, baseUrl)` keeps the `/api` segment.
 */
export const RICK_AND_MORTY_BASE_URL = "https://rickandmortyapi.com";

const client = createHttpClient({ baseUrl: RICK_AND_MORTY_BASE_URL });

/** Fetches the first page of characters from the Rick & Morty API. */
export async function fetchCharacters(): Promise<Character[]> {
  const data = await client.get<CharacterListResponse>("/api/character");
  return data.results;
}
