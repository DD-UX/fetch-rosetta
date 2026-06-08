import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VariantCard } from "./VariantCard";
import { FETCH_VARIANTS } from "@/features/common/constants/fetch-variants.constants";
import type { FetchVariant } from "@/features/common/types/fetch-variant.types";

/** Resolve a real variant by id so tests track production data and break if it changes. */
function variantById(id: string): FetchVariant {
  const variant = FETCH_VARIANTS.find((candidate) => candidate.id === id);
  if (!variant) {
    throw new Error(`No FETCH_VARIANTS entry with id "${id}"`);
  }
  return variant;
}

const availableVariant = variantById("csr-fetch");
const comingSoonVariant = variantById("zustand");

describe("VariantCard", () => {
  describe("positive", () => {
    it("renders the variant label and description", () => {
      render(<VariantCard variant={availableVariant} />);
      expect(screen.getByText(availableVariant.label)).toBeInTheDocument();
      expect(
        screen.getByText(availableVariant.description),
      ).toBeInTheDocument();
    });

    it("links an available variant to its route", () => {
      render(<VariantCard variant={availableVariant} />);
      const link = screen.getByRole("link", { name: "Open variant" });
      expect(link).toHaveAttribute("href", `/rosetta/${availableVariant.id}`);
    });

    it("forwards className to the card", () => {
      const { container } = render(
        <VariantCard variant={availableVariant} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("negative", () => {
    // Branch tests force `available` so they exercise the flag regardless of
    // which variant carries it in production data.
    it("does not render a link for an unavailable variant", () => {
      render(
        <VariantCard variant={{ ...comingSoonVariant, available: false }} />,
      );
      expect(
        screen.queryByRole("link", { name: "Open variant" }),
      ).not.toBeInTheDocument();
    });

    it("shows a disabled CTA and a coming-soon badge when unavailable", () => {
      render(
        <VariantCard variant={{ ...comingSoonVariant, available: false }} />,
      );
      expect(
        screen.getByRole("button", { name: "Open variant" }),
      ).toBeDisabled();
      expect(screen.getByText("Coming soon")).toBeInTheDocument();
    });

    it("hides the coming-soon badge when the variant is available", () => {
      render(
        <VariantCard variant={{ ...availableVariant, available: true }} />,
      );
      expect(screen.queryByText("Coming soon")).not.toBeInTheDocument();
    });
  });
});
