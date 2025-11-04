
"use client";
import React from "react";
import clsx from "clsx";

const ITEMS = [
  { key: "dashboard", label: "Översikt", icon: "🏠" },
  { key: "crm", label: "Kunder (CRM)", icon: "👥" },
  { key: "economy", label: "Ekonomi", icon: "📄" },
  { key: "ai", label: "AI-Nav", icon: "🧠" },
  { key: "map", label: "AI-karta", icon: "🗺️" },
  { key: "chat", label: "Chatt", icon: "💬" },
  { key: "settings", label: "Inställningar", icon: "⚙️" }
];

export default function Sidebar({ active, onNavigate }:{active:string; onNavigate:(k:string)=>void}){
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo" />
        <div>
          <h2>MergX Admin</h2>
          <small>v8.55 • Dark</small>
        </div>
      </div>
      <nav className="nav">
        {ITEMS.map(it=> (
          <button key={it.key} className={clsx(active===it.key && "active")} onClick={()=>onNavigate(it.key)}>
            <span style={{width:22,textAlign:"center"}}>{it.icon}</span>
            <span>{it.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
