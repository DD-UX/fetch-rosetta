import type { Metadata } from "next";
import Link from "next/link";
import { CharacterList } from "@/features/csr-fetch/components/CharacterList";

export const metadata: Metadata = {
  title: "CSR fetch — Fetch Rosetta",
  description:
    "Client-side rendered character list fetched in the browser via the SDK with a race-safe useEffect hook.",
};

export default function CsrFetchPage() {
  return (
    <main className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <Link
          href="/rosetta"
          className="text-sm text-zinc-500 hover:text-zinc-900 hover:underline"
        >
          ← All variants
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">CSR fetch</h1>
        <p className="max-w-2xl text-zinc-600">
          The browser fetches characters through the SDK inside a client
          component. A race-safe <code>useEffect</code> hook drives the
          loading, error, and success states.
        </p>
      </section>
      <CharacterList />
    </main>
  );
}
