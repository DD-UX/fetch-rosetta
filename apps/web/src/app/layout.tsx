import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fetch Rosetta",
  description:
    "Same app, many data layers — a comparison matrix of React data-fetching and state architectures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
