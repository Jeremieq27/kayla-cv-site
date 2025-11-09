import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kayla Scullin",
  description: "Boston based Legal Researcher specializing in Art, Copyright, and IP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-zinc-200 selection:text-black">
        {children}
      </body>
    </html>
  );
}
