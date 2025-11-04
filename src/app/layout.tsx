
import "@/styles/globals.css";
import React from "react";

export const metadata = { title: "MergX v8.55", description: "Admin + B2B foundation (Dark)" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
