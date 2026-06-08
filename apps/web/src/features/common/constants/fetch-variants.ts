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
}

export const FETCH_VARIANTS: readonly FetchVariant[] = [
  { id: "rsc", label: "RSC + Server Actions" },
  { id: "ssr-fetch", label: "SSR fetch" },
  { id: "csr-fetch", label: "CSR fetch" },
  { id: "context", label: "React Context" },
  { id: "zustand", label: "Zustand" },
  { id: "redux", label: "Redux Toolkit" },
  { id: "rtk-query", label: "RTK Query" },
  { id: "tanstack-query", label: "TanStack Query" },
  { id: "swr", label: "SWR" },
];
