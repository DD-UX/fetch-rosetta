import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";
import { FETCH_VARIANTS } from "@/features/common/constants/fetch-variants";

describe("Hero", () => {
  describe("positive", () => {
    it("renders the main heading", () => {
      render(<Hero />);
      expect(
        screen.getByRole("heading", { level: 1, name: "Fetch Rosetta" }),
      ).toBeInTheDocument();
    });

    it("describes the data-fetching premise", () => {
      render(<Hero />);
      expect(
        screen.getByText(/many different\s+React ways/i),
      ).toBeInTheDocument();
    });

    it("renders a chip for every fetch variant", () => {
      render(<Hero />);
      for (const variant of FETCH_VARIANTS) {
        expect(screen.getByText(variant.label)).toBeInTheDocument();
      }
    });

    it("renders exactly one chip per variant and no more", () => {
      render(<Hero />);
      expect(screen.getAllByRole("listitem")).toHaveLength(
        FETCH_VARIANTS.length,
      );
    });

    it("forwards className and arbitrary props to the section", () => {
      const { container } = render(
        <Hero className="custom-class" data-testid="hero" />,
      );
      const section = container.querySelector("section");
      expect(section).toHaveClass("custom-class");
      expect(section).toHaveAttribute("data-testid", "hero");
    });
  });

  describe("negative", () => {
    it("does not render variants that are not in the list", () => {
      render(<Hero />);
      expect(screen.queryByText("GraphQL")).not.toBeInTheDocument();
      expect(screen.queryByText("Apollo Client")).not.toBeInTheDocument();
    });

    it("renders no chips beyond the configured variants", () => {
      render(<Hero />);
      const labels = new Set(FETCH_VARIANTS.map((variant) => variant.label));
      for (const item of screen.getAllByRole("listitem")) {
        expect(labels.has(item.textContent ?? "")).toBe(true);
      }
    });
  });
});
