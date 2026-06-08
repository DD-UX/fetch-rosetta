import {
  createHttpClient,
  type Character,
  type CharacterListResponse,
} from "@fetch-rosetta/sdk";

/**
 * Origin of the public Rick & Morty API. The path (`/api/character`) is passed
 * per-request so the SDK's `new URL(path, baseUrl)` keeps the `/api` segment.
 */
const RICK_AND_MORTY_BASE_URL = "https://rickandmortyapi.com";

const client = createHttpClient({ baseUrl: RICK_AND_MORTY_BASE_URL });

/**
 * Fetches the first page of characters on the server for the SSR variant.
 * Runs during the request on the server (the route opts into `force-dynamic`),
 * so the HTML ships already populated — no client-side fetch, no loading flash.
 */
export async function fetchCharactersOnServer(): Promise<Character[]> {
  const data = await client.get<CharacterListResponse>("/api/character");
  return data.results;
}
