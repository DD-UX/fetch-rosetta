import type { Metadata } from "next";
import { VariantList } from "@/features/rosetta/components/VariantList";

export const metadata: Metadata = {
  title: "Variants — Fetch Rosetta",
  description:
    "Pick a data-fetching architecture to see the same character list built that React way.",
};

export default function RosettaPage() {
  return (
    <main className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Fetch variants</h1>
        <p className="max-w-2xl text-zinc-600">
          Every card builds the same Rick &amp; Morty character list a different
          React way. Open one to feel the trade-offs — more variants land over
          time.
        </p>
      </section>
      <VariantList />
    </main>
  );
}
