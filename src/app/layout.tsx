import type { Metadata } from "next";
import "./globals.css";
import { ApiProvider } from "@/contexts/ApiContext";

export const metadata: Metadata = {
  title: "Smarkets by Adam",
  description: "Place your bets!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApiProvider>
        <body className="bg-black">{children}</body>
      </ApiProvider>
    </html>
  );
}
