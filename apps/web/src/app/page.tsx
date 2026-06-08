import { Hero } from "@/features/home/components/Hero";
import { Showcase } from "@/features/home/components/Showcase";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-8">
      <Hero />
      <Showcase />
    </main>
  );
}
