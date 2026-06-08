import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VariantList } from "./VariantList";
import { FETCH_VARIANTS } from "@/features/common/constants/fetch-variants";

describe("VariantList", () => {
  describe("positive", () => {
    it("renders one card per fetch variant", () => {
      render(<VariantList />);
      expect(screen.getAllByRole("listitem")).toHaveLength(
        FETCH_VARIANTS.length,
      );
    });

    it("renders the label of every variant", () => {
      render(<VariantList />);
      for (const variant of FETCH_VARIANTS) {
        expect(screen.getByText(variant.label)).toBeInTheDocument();
      }
    });

    it("links each available variant to its route", () => {
      render(<VariantList />);
      const available = FETCH_VARIANTS.filter((variant) => variant.available);
      const links = screen.getAllByRole("link", { name: "Open variant" });
      expect(links).toHaveLength(available.length);
    });
  });

  describe("negative", () => {
    it("renders a coming-soon badge for every unavailable variant", () => {
      render(<VariantList />);
      const unavailable = FETCH_VARIANTS.filter(
        (variant) => !variant.available,
      );
      expect(screen.getAllByText("Coming soon")).toHaveLength(
        unavailable.length,
      );
    });
  });
});
