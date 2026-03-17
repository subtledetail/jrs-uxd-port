import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jason Reid Scott — Design Director & UX Strategist",
  description: "Portfolio of Jason Reid Scott, Design Director & UX Strategist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vxo7juh.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
