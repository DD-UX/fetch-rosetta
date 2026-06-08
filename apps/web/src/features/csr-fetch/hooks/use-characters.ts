"use client";

import { useEffect, useState } from "react";
import type { Character } from "@fetch-rosetta/sdk";
import { fetchCharacters } from "../helpers/characters-client";

export type CharactersStatus = "loading" | "success" | "error";

export interface UseCharactersResult {
  status: CharactersStatus;
  characters: Character[];
  error: Error | null;
}

/**
 * Client-side character fetch using the canonical React pattern: kick off the
 * request in an effect and guard against race conditions / unmount with an
 * `ignore` flag in cleanup, so a stale response can never overwrite fresh state.
 */
export function useCharacters(): UseCharactersResult {
  const [status, setStatus] = useState<CharactersStatus>("loading");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;

    setStatus("loading");
    setError(null);

    fetchCharacters()
      .then((result) => {
        if (ignore) return;
        setCharacters(result);
        setStatus("success");
      })
      .catch((cause: unknown) => {
        if (ignore) return;
        setError(cause instanceof Error ? cause : new Error("Unknown error"));
        setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { status, characters, error };
}
