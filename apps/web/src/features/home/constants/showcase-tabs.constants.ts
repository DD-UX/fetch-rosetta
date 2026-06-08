import type { ShowcaseTab } from "../types/showcase-tab.types";

export const SHOWCASE_TABS = {
  kit: { value: "kit", label: "UI Kit" },
  about: { value: "about", label: "About" },
} as const satisfies Record<string, ShowcaseTab>;

/** Tab selected when the showcase first mounts. */
export const SHOWCASE_DEFAULT_TAB = SHOWCASE_TABS.kit.value;
