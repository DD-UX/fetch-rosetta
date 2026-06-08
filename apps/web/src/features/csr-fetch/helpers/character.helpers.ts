import type { Character } from "@fetch-rosetta/sdk";

/** Builds a `Character` for tests, overriding only the fields a case cares about. */
export function makeCharacter(overrides: Partial<Character> = {}): Character {
  return {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "https://example.com/1.jpeg",
    episode: [],
    url: "",
    created: "",
    ...overrides,
  };
}
