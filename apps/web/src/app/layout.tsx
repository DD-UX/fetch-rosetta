import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Header } from "@/features/common/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fetch Rosetta",
  description:
    "Same app, many data layers — a comparison matrix of React data-fetching and state architectures.",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 p-8">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
