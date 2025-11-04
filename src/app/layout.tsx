import "@/styles/globals.css";
import React from "react";
export const metadata = { title: "MergX v8.56C", description: "AI-driven Adminsystem" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="sv"><body>{children}</body></html>);
}
