'use client';
import React from "react";
import Link from "next/link";

export default function Sidebar() {
  const items = [
    { name: "Dashboard", path: "/" },
    { name: "CRM", path: "/crm" },
    { name: "Ekonomi", path: "/economy" },
    { name: "Filer / Kvitton", path: "/files" },
    { name: "Inställningar", path: "/settings" }
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">MergX</h2>
      <nav>
        {items.map(i => (
          <Link key={i.path} href={i.path} className="navlink">
            {i.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
