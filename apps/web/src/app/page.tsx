import { sdkInfo } from "@fetch-rosetta/sdk";

export default function HomePage() {
  const info = sdkInfo();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Fetch Rosetta</h1>
      <p className="text-center text-lg text-zinc-600">
        Same app, many data layers. A comparison matrix of React data-fetching
        and state architectures.
      </p>
      <p className="rounded-md bg-zinc-200 px-3 py-1 font-mono text-sm text-zinc-700">
        SDK wired: {info.name} v{info.version}
      </p>
    </main>
  );
}
