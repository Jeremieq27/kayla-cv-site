import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kayla Scullin — CV",
  description: "Futuristic one-page CV for Kayla Scullin (Web2 + Web3 deploy)",
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
