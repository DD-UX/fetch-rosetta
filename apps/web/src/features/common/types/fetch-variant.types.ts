/**
 * The data-fetching / state architectures showcased across the matrix.
 * Each variant implements the same feature a different React way so the
 * trade-offs can be compared side by side.
 */
export interface FetchVariant {
  /** Stable key, also used for routing/test selectors. */
  id: string;
  /** Human-readable chip label. */
  label: string;
  /** One-line summary of the architecture this variant demonstrates. */
  description: string;
  /** Whether the variant's route is implemented yet (vs. "coming soon"). */
  available: boolean;
}
