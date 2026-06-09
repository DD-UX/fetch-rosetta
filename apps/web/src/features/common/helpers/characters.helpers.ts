import {
  createHttpClient,
  type Character,
  type CharacterListResponse,
} from "@fetch-rosetta/sdk";

/**
 * Origin of the public Rick & Morty API. The path (`/api/character`) is passed
 * per-request so the SDK's `new URL(path, baseUrl)` keeps the `/api` segment.
 * Ideally the SDK would own this origin; until then it lives here once and is
 * shared by every fetch strategy.
 */
const RICK_AND_MORTY_BASE_URL = "https://rickandmortyapi.com";

const client = createHttpClient({ baseUrl: RICK_AND_MORTY_BASE_URL });

/**
 * Fetches the first page of characters from the Rick & Morty API. Works on the
 * server (call without a signal) and on the client (pass an `AbortSignal` to
 * make the request cancellable) — the signal is optional, never mandatory.
 */
export async function fetchCharacters(
  signal?: AbortSignal,
): Promise<Character[]> {
  const data = await client.get<CharacterListResponse>(
    "/api/character",
    undefined,
    { signal },
  );
  return data.results;
}
