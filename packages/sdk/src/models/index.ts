/**
 * Shared entity models for every data-layer variant.
 * Add API-specific models here (e.g. Rick and Morty characters,
 * DummyJSON products) so all matrix cells consume identical types.
 */

export interface Paginated<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

/** Lifecycle status of a Rick and Morty character. */
export type CharacterStatus = "Alive" | "Dead" | "unknown";

/** Gender of a Rick and Morty character. */
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

/** A named resource reference returned by the Rick and Morty API. */
export interface ResourceRef {
  name: string;
  url: string;
}

/** A Rick and Morty character, mirrored from the public API schema. */
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: ResourceRef;
  location: ResourceRef;
  /** Absolute URL of the character's avatar image. */
  image: string;
  /** URLs of the episodes the character appears in. */
  episode: string[];
  url: string;
  created: string;
}

/** Pagination metadata block returned by the Rick and Morty API. */
export interface CharacterListInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

/** Shape of `GET /api/character` — the paginated character list endpoint. */
export interface CharacterListResponse {
  info: CharacterListInfo;
  results: Character[];
}
