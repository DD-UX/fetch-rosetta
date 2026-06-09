/** Origin of the public Rick & Morty API; shared by every fetch strategy. */
export const RICK_AND_MORTY_BASE_URL = "https://rickandmortyapi.com";

/**
 * Path to the Rick & Morty character collection. Passed per-request so the
 * SDK's `new URL(path, baseUrl)` keeps the `/api` segment.
 */
export const CHARACTERS_API_PATH = "/api/character";
