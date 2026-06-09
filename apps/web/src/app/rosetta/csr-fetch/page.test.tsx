import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CsrFetchPage from "./page";

// Stub the data-bound list so the page shell can be tested in isolation,
// without the client fetch hook firing during render.
vi.mock("@/features/csr-fetch/components/CharacterList", () => ({
  CharacterList: () => <div data-testid="character-list" />,
}));

describe("CsrFetchPage", () => {
  describe("positive", () => {
    it("renders the CSR fetch heading", () => {
      render(<CsrFetchPage />);
      expect(
        screen.getByRole("heading", { level: 1, name: "CSR fetch" }),
      ).toBeInTheDocument();
    });

    it("links back to the variants index", () => {
      render(<CsrFetchPage />);
      expect(
        screen.getByRole("link", { name: /All variants/ }),
      ).toHaveAttribute("href", "/rosetta");
    });

    it("mounts the character list", () => {
      render(<CsrFetchPage />);
      expect(screen.getByTestId("character-list")).toBeInTheDocument();
    });
  });
});
