import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Character } from "@fetch-rosetta/sdk";
import { CharacterCard } from "./CharacterCard";

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

describe("CharacterCard", () => {
  describe("positive", () => {
    it("renders the character name, species, and status", () => {
      render(<CharacterCard character={makeCharacter()} />);
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Human")).toBeInTheDocument();
      expect(screen.getByText("Alive")).toBeInTheDocument();
    });

    it("renders the avatar image with the character name as alt text", () => {
      render(<CharacterCard character={makeCharacter()} />);
      const image = screen.getByRole("img", { name: "Rick Sanchez" });
      expect(image).toHaveAttribute("src", "https://example.com/1.jpeg");
    });
  });

  describe("negative", () => {
    it("does not show a status other than the character's own", () => {
      render(<CharacterCard character={makeCharacter({ status: "Dead" })} />);
      expect(screen.getByText("Dead")).toBeInTheDocument();
      expect(screen.queryByText("Alive")).not.toBeInTheDocument();
    });
  });
});
