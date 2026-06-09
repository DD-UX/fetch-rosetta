import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SsrFetchPage from "./page";

// Stub the async Server Component child: its server fetch belongs to E2E,
// so the page shell is unit-tested in isolation here.
vi.mock("@/features/ssr-fetch/components/CharacterList", () => ({
  CharacterList: () => <div data-testid="character-list" />,
}));

describe("SsrFetchPage", () => {
  describe("positive", () => {
    it("renders the SSR fetch heading", () => {
      render(<SsrFetchPage />);
      expect(
        screen.getByRole("heading", { level: 1, name: "SSR fetch" }),
      ).toBeInTheDocument();
    });

    it("links back to the variants index", () => {
      render(<SsrFetchPage />);
      expect(
        screen.getByRole("link", { name: /All variants/ }),
      ).toHaveAttribute("href", "/rosetta");
    });

    it("mounts the character list", () => {
      render(<SsrFetchPage />);
      expect(screen.getByTestId("character-list")).toBeInTheDocument();
    });
  });
});
