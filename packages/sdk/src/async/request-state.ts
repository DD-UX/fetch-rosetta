/**
 * Shared async request-state vocabulary for every data-layer variant.
 * Centralising it here keeps all matrix cells (CSR fetch, SWR, TanStack
 * Query, …) reporting their lifecycle with identical, non-duplicated values.
 */

/** Canonical async request lifecycle values — the single source of truth. */
export const REQUEST_STATUS = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
} as const;

/** Lifecycle of an async request, derived from {@link REQUEST_STATUS}. */
export type RequestStatus =
  (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];
