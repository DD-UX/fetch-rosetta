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

export const FETCH_VARIANTS: readonly FetchVariant[] = [
  {
    id: "rsc",
    label: "RSC + Server Actions",
    description: "Fetch on the server, stream to the client, mutate via actions.",
    available: false,
  },
  {
    id: "ssr-fetch",
    label: "SSR fetch",
    description: "Request-time fetch in a Server Component, rendered to HTML.",
    available: false,
  },
  {
    id: "csr-fetch",
    label: "CSR fetch",
    description: "Browser-side fetch via the SDK with a race-safe useEffect hook.",
    available: true,
  },
  {
    id: "context",
    label: "React Context",
    description: "Share fetched data through a Context provider down the tree.",
    available: false,
  },
  {
    id: "zustand",
    label: "Zustand",
    description: "Hold server data in a lightweight external Zustand store.",
    available: false,
  },
  {
    id: "redux",
    label: "Redux Toolkit",
    description: "Manage data with Redux Toolkit slices and thunks.",
    available: false,
  },
  {
    id: "rtk-query",
    label: "RTK Query",
    description: "Cache and auto-fetch via RTK Query endpoints.",
    available: false,
  },
  {
    id: "tanstack-query",
    label: "TanStack Query",
    description: "Cache, dedupe, and revalidate with TanStack Query.",
    available: false,
  },
  {
    id: "swr",
    label: "SWR",
    description: "Stale-while-revalidate data fetching with the SWR hook.",
    available: false,
  },
];

/** Route a variant's detail page lives at. */
export function variantHref(variant: FetchVariant): string {
  return `/rosetta/${variant.id}`;
}
