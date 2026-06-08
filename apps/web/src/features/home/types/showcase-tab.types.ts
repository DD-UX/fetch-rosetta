/**
 * A tab rendered by the home `Showcase`. Pairs the stable tab `value`
 * (also used as a test selector) with its visible trigger label.
 */
export interface ShowcaseTab {
  /** Stable key shared by the trigger and its matching content panel. */
  value: string;
  /** Human-readable trigger label. */
  label: string;
}
