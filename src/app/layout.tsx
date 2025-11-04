
import "@/styles/globals.css";
import React from "react";

export const metadata = { title: "MergX v8.54", description: "Admin + B2B foundation" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
