import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ZustandFetchPage from "./page";

// Stub the data-bound list so the page shell can be tested in isolation,
// without the store load firing during render.
vi.mock("@/features/zustand-fetch/components/CharacterList", () => ({
  CharacterList: () => <div data-testid="character-list" />,
}));

describe("ZustandFetchPage", () => {
  describe("positive", () => {
    it("renders the Zustand heading", () => {
      render(<ZustandFetchPage />);
      expect(
        screen.getByRole("heading", { level: 1, name: "Zustand" }),
      ).toBeInTheDocument();
    });

    it("links back to the variants index", () => {
      render(<ZustandFetchPage />);
      expect(
        screen.getByRole("link", { name: /All variants/ }),
      ).toHaveAttribute("href", "/rosetta");
    });

    it("mounts the character list", () => {
      render(<ZustandFetchPage />);
      expect(screen.getByTestId("character-list")).toBeInTheDocument();
    });
  });
});
