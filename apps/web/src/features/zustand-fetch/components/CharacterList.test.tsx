import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { REQUEST_STATUS, type Character } from "@fetch-rosetta/sdk";
import { CharacterList } from "./CharacterList";
import type { CharactersState } from "../store/characters.store";
import { makeCharacter } from "@/features/common/helpers/character.helpers";

const loadMock = vi.fn();

vi.mock("../store/characters.store", () => ({
  useCharactersStore: <T,>(selector: (state: CharactersState) => T): T =>
    selector(currentState),
}));

let currentState: CharactersState;

function setState(overrides: Partial<CharactersState>): void {
  currentState = {
    status: REQUEST_STATUS.loading,
    characters: [],
    error: null,
    load: loadMock,
    ...overrides,
  };
}

describe("zustand CharacterList", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("positive", () => {
    it("renders the characters held in the store", () => {
      const characters: Character[] = [
        makeCharacter({ id: 1, name: "Rick Sanchez" }),
        makeCharacter({ id: 2, name: "Morty Smith" }),
      ];
      setState({ status: REQUEST_STATUS.success, characters });

      render(<CharacterList />);

      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    });

    it("triggers the store load on mount", () => {
      setState({});
      render(<CharacterList />);
      expect(loadMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("negative", () => {
    it("renders the error alert when the store is in the error state", () => {
      setState({
        status: REQUEST_STATUS.error,
        error: new Error("network down"),
      });

      render(<CharacterList />);

      expect(screen.getByText("Couldn't load characters")).toBeInTheDocument();
      expect(screen.getByText("network down")).toBeInTheDocument();
    });
  });
});
