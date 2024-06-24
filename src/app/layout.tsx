import type { Metadata } from "next";
import "./globals.css";
import { EventsDaoProvider } from "@/contexts/EventsDao";

export const metadata: Metadata = {
  title: "Smarkets by Adam",
  description: "Place your bets!"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <EventsDaoProvider>
        <body className="bg-black">
          {children}
        </body>
      </EventsDaoProvider>
    </html>
  );
}
