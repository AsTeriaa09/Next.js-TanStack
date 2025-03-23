import type { Metadata } from "next";
import "./globals.css";
import { TanstackProvider } from "@/components/providers/tanstack-provider";

export const metadata: Metadata = {
  title: "Next.js Tanstack",
  description: "Next.js app with tanstack query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
