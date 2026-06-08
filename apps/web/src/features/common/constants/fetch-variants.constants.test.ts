import { describe, expect, it } from "vitest";
import { FETCH_VARIANTS, variantHref } from "./fetch-variants.constants";

describe("FETCH_VARIANTS", () => {
  describe("positive", () => {
    it("contains at least one variant", () => {
      expect(FETCH_VARIANTS.length).toBeGreaterThan(0);
    });

    it("gives every variant a non-empty id, label, and description", () => {
      for (const variant of FETCH_VARIANTS) {
        expect(variant.id.trim()).not.toBe("");
        expect(variant.label.trim()).not.toBe("");
        expect(variant.description.trim()).not.toBe("");
      }
    });

    it("marks the CSR fetch variant as available", () => {
      const csr = FETCH_VARIANTS.find((variant) => variant.id === "csr-fetch");
      expect(csr?.available).toBe(true);
    });

    it("builds a /rosetta route from a variant id", () => {
      const [first] = FETCH_VARIANTS;
      expect(first).toBeDefined();
      expect(variantHref(first!)).toBe(`/rosetta/${first!.id}`);
    });
  });

  describe("negative", () => {
    it("has no duplicate ids", () => {
      const ids = FETCH_VARIANTS.map((variant) => variant.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("has no duplicate labels", () => {
      const labels = FETCH_VARIANTS.map((variant) => variant.label);
      expect(new Set(labels).size).toBe(labels.length);
    });

    it("does not expose an unknown variant id", () => {
      const ids = FETCH_VARIANTS.map((variant) => variant.id);
      expect(ids).not.toContain("graphql");
    });
  });
});
