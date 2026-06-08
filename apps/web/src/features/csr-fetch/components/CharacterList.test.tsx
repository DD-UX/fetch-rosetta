import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { REQUEST_STATUS, type Character } from "@fetch-rosetta/sdk";
import { CharacterList } from "./CharacterList";
import type { UseCharactersResult } from "../hooks/use-characters";
import { useCharacters } from "../hooks/use-characters";

vi.mock("../hooks/use-characters", () => ({
  useCharacters: vi.fn(),
}));

const useCharactersMock = vi.mocked(useCharacters);

function makeCharacter(overrides: Partial<Character> = {}): Character {
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

function mockState(state: Partial<UseCharactersResult>) {
  useCharactersMock.mockReturnValue({
    status: REQUEST_STATUS.success,
    characters: [],
    error: null,
    ...state,
  });
}

describe("CharacterList", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("positive", () => {
    it("renders a card for each fetched character", () => {
      mockState({
        status: REQUEST_STATUS.success,
        characters: [
          makeCharacter({ id: 1, name: "Rick Sanchez" }),
          makeCharacter({ id: 2, name: "Morty Smith" }),
        ],
      });

      render(<CharacterList />);

      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("shows a busy placeholder while loading", () => {
      mockState({ status: REQUEST_STATUS.loading });
      const { container } = render(<CharacterList />);
      expect(container.querySelector("[aria-busy]")).toBeInTheDocument();
    });
  });

  describe("negative", () => {
    it("renders an error alert when the fetch fails", () => {
      mockState({
        status: REQUEST_STATUS.error,
        error: new Error("network down"),
      });

      render(<CharacterList />);

      expect(screen.getByRole("alert")).toHaveTextContent("network down");
      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    });

    it("renders an empty-state alert when there are no characters", () => {
      mockState({ status: REQUEST_STATUS.success, characters: [] });

      render(<CharacterList />);

      expect(screen.getByText("No characters")).toBeInTheDocument();
      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    });

    it("does not render character cards while loading", () => {
      mockState({ status: REQUEST_STATUS.loading });
      render(<CharacterList />);
      expect(screen.queryByText("Rick Sanchez")).not.toBeInTheDocument();
    });
  });
});
