import { Header } from "@/features/common/components/Header";
import { Hero } from "@/features/home/components/Hero";
import { Showcase } from "@/features/home/components/Showcase";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 p-8">
      <Header />
      <Hero />
      <Showcase />
    </main>
  );
}
