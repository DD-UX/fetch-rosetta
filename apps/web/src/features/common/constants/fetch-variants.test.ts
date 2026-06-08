import { describe, expect, it } from "vitest";
import { FETCH_VARIANTS } from "./fetch-variants";

describe("FETCH_VARIANTS", () => {
  describe("positive", () => {
    it("contains at least one variant", () => {
      expect(FETCH_VARIANTS.length).toBeGreaterThan(0);
    });

    it("gives every variant a non-empty id and label", () => {
      for (const variant of FETCH_VARIANTS) {
        expect(variant.id.trim()).not.toBe("");
        expect(variant.label.trim()).not.toBe("");
      }
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
  });
});
