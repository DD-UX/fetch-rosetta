import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { REQUEST_STATUS } from "@fetch-rosetta/sdk";
import { CharacterListView } from "./CharacterListView";
import { makeCharacter } from "@/features/csr-fetch/helpers/character.helpers";

describe("CharacterListView", () => {
  describe("positive", () => {
    it("renders a card per character on success", () => {
      const characters = [
        makeCharacter({ id: 1, name: "Rick Sanchez" }),
        makeCharacter({ id: 2, name: "Morty Smith" }),
      ];
      render(
        <CharacterListView
          status={REQUEST_STATUS.success}
          characters={characters}
        />,
      );
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    });

    it("renders skeleton placeholders while loading", () => {
      const { container } = render(
        <CharacterListView status={REQUEST_STATUS.loading} characters={[]} />,
      );
      expect(container.querySelector("[aria-busy]")).toBeInTheDocument();
    });
  });

  describe("negative", () => {
    it("shows the error alert with the error message", () => {
      render(
        <CharacterListView
          status={REQUEST_STATUS.error}
          characters={[]}
          error={new Error("network down")}
        />,
      );
      expect(screen.getByText("Couldn't load characters")).toBeInTheDocument();
      expect(screen.getByText("network down")).toBeInTheDocument();
    });

    it("shows the empty alert when success yields no characters", () => {
      render(
        <CharacterListView status={REQUEST_STATUS.success} characters={[]} />,
      );
      expect(screen.getByText("No characters")).toBeInTheDocument();
    });

    it("does not render character cards in the error state", () => {
      render(
        <CharacterListView
          status={REQUEST_STATUS.error}
          characters={[makeCharacter({ name: "Rick Sanchez" })]}
        />,
      );
      expect(screen.queryByText("Rick Sanchez")).not.toBeInTheDocument();
    });
  });
});
