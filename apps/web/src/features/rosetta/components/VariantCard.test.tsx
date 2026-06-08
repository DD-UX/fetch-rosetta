import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VariantCard } from "./VariantCard";
import type { FetchVariant } from "@/features/common/constants/fetch-variants.constants";

const availableVariant: FetchVariant = {
  id: "csr-fetch",
  label: "CSR fetch",
  description: "Browser-side fetch via the SDK.",
  available: true,
};

const comingSoonVariant: FetchVariant = {
  id: "zustand",
  label: "Zustand",
  description: "Hold server data in a store.",
  available: false,
};

describe("VariantCard", () => {
  describe("positive", () => {
    it("renders the variant label and description", () => {
      render(<VariantCard variant={availableVariant} />);
      expect(screen.getByText("CSR fetch")).toBeInTheDocument();
      expect(
        screen.getByText("Browser-side fetch via the SDK."),
      ).toBeInTheDocument();
    });

    it("links an available variant to its route", () => {
      render(<VariantCard variant={availableVariant} />);
      const link = screen.getByRole("link", { name: "Open variant" });
      expect(link).toHaveAttribute("href", "/rosetta/csr-fetch");
    });

    it("forwards className to the card", () => {
      const { container } = render(
        <VariantCard variant={availableVariant} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("negative", () => {
    it("does not render a link for an unavailable variant", () => {
      render(<VariantCard variant={comingSoonVariant} />);
      expect(
        screen.queryByRole("link", { name: "Open variant" }),
      ).not.toBeInTheDocument();
    });

    it("shows a disabled CTA and a coming-soon badge when unavailable", () => {
      render(<VariantCard variant={comingSoonVariant} />);
      expect(
        screen.getByRole("button", { name: "Open variant" }),
      ).toBeDisabled();
      expect(screen.getByText("Coming soon")).toBeInTheDocument();
    });

    it("hides the coming-soon badge when the variant is available", () => {
      render(<VariantCard variant={availableVariant} />);
      expect(screen.queryByText("Coming soon")).not.toBeInTheDocument();
    });
  });
});
