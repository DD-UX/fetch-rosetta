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
 * request in an effect and cancel it on unmount / re-run via an
 * `AbortController`, so an in-flight request is torn down and a stale response
 * can never overwrite fresh state. Aborts are intentional, so they are ignored
 * rather than surfaced as errors.
 */
export function useCharacters(): UseCharactersResult {
  const [status, setStatus] = useState<RequestStatus>(REQUEST_STATUS.loading);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setStatus(REQUEST_STATUS.loading);
    setError(null);

    fetchCharacters(controller.signal)
      .then((result) => {
        setCharacters(result);
        setStatus(REQUEST_STATUS.success);
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setError(cause instanceof Error ? cause : new Error("Unknown error"));
        setStatus(REQUEST_STATUS.error);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { status, characters, error };
}
