import { REQUEST_STATUS } from "@fetch-rosetta/sdk";
import { fetchCharactersOnServer } from "../helpers/characters-server.helpers";
import { CharacterListView } from "./CharacterListView";

/**
 * Server Component for the SSR variant: fetches characters during the request
 * on the server and renders the populated list straight to HTML — no client
 * hook, no loading state on the wire. A failed fetch is caught and surfaced as
 * the same error Alert the CSR variant shows, so the two pages look identical.
 */
export async function CharacterList() {
  try {
    const characters = await fetchCharactersOnServer();
    return (
      <CharacterListView
        status={REQUEST_STATUS.success}
        characters={characters}
      />
    );
  } catch (cause) {
    const error = cause instanceof Error ? cause : new Error("Unknown error");
    return (
      <CharacterListView
        status={REQUEST_STATUS.error}
        characters={[]}
        error={error}
      />
    );
  }
}
