import type { Metadata } from "next";
import Link from "next/link";
import { CharacterList } from "@/features/zustand-fetch/components/CharacterList";

export const metadata: Metadata = {
  title: "Zustand — Fetch Rosetta",
  description:
    "Character list whose request lifecycle and data live in a lightweight external Zustand store, fetched via the SDK.",
};

export default function ZustandFetchPage() {
  return (
    <main className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <Link
          href="/rosetta"
          className="text-sm text-zinc-500 hover:text-zinc-900 hover:underline"
        >
          ← All variants
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Zustand</h1>
        <p className="max-w-2xl text-zinc-600">
          The characters live in a lightweight external <code>Zustand</code>{" "}
          store instead of component state. The store owns the loading, error,
          and success states, and the component simply subscribes to them.
        </p>
      </section>
      <CharacterList />
    </main>
  );
}
