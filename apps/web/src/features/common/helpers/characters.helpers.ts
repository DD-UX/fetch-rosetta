import {
  createHttpClient,
  type Character,
  type CharacterListResponse,
} from "@fetch-rosetta/sdk";
import {
  CHARACTERS_API_PATH,
  RICK_AND_MORTY_BASE_URL,
} from "../constants/characters.constants";

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
    CHARACTERS_API_PATH,
    undefined,
    { signal },
  );
  return data.results;
}
