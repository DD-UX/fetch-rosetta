import type { Metadata } from "next";
import Link from "next/link";
import { CharacterList } from "@/features/ssr-fetch/components/CharacterList";

export const metadata: Metadata = {
  title: "SSR fetch — Fetch Rosetta",
  description:
    "Server-side rendered character list fetched on the server via the SDK and streamed to the client as ready HTML.",
};

// Fetch on every request so the list is always fresh and the error path stays
// deterministic — this variant is about server rendering, not caching.
export const dynamic = "force-dynamic";

export default function SsrFetchPage() {
  return (
    <main className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <Link
          href="/rosetta"
          className="text-sm text-zinc-500 hover:text-zinc-900 hover:underline"
        >
          ← All variants
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">SSR fetch</h1>
        <p className="max-w-2xl text-zinc-600">
          The server fetches characters through the SDK inside a Server
          Component and renders the list straight to HTML. No client hook, no
          loading flash — the data arrives already painted.
        </p>
      </section>
      <CharacterList />
    </main>
  );
}
