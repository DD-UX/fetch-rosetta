/**
 * Tabs rendered by the home `Showcase`. Each entry pairs the stable tab
 * `value` (also used as a test selector) with its visible trigger label.
 */
export interface ShowcaseTab {
  /** Stable key shared by the trigger and its matching content panel. */
  value: string;
  /** Human-readable trigger label. */
  label: string;
}

export const SHOWCASE_TABS = {
  kit: { value: "kit", label: "UI Kit" },
  about: { value: "about", label: "About" },
} as const satisfies Record<string, ShowcaseTab>;

/** Tab selected when the showcase first mounts. */
export const SHOWCASE_DEFAULT_TAB = SHOWCASE_TABS.kit.value;
