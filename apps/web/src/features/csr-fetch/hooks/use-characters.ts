"use client";

import { useEffect, useState } from "react";
import {
  REQUEST_STATUS,
  type Character,
  type RequestStatus,
} from "@fetch-rosetta/sdk";
import { fetchCharacters } from "../helpers/characters-client";

export interface UseCharactersResult {
  status: RequestStatus;
  characters: Character[];
  error: Error | null;
}

/**
 * Client-side character fetch using the canonical React pattern: kick off the
 * request in an effect and guard against race conditions / unmount with an
 * `ignore` flag in cleanup, so a stale response can never overwrite fresh state.
 */
export function useCharacters(): UseCharactersResult {
  const [status, setStatus] = useState<RequestStatus>(REQUEST_STATUS.loading);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;

    setStatus(REQUEST_STATUS.loading);
    setError(null);

    fetchCharacters()
      .then((result) => {
        if (ignore) return;
        setCharacters(result);
        setStatus(REQUEST_STATUS.success);
      })
      .catch((cause: unknown) => {
        if (ignore) return;
        setError(cause instanceof Error ? cause : new Error("Unknown error"));
        setStatus(REQUEST_STATUS.error);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { status, characters, error };
}
