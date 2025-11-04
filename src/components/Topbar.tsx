
"use client";
import React from "react";

export default function Topbar({ title, onRange }: { title: string; onRange: (r: string) => void }) {
  return (
    <header className="topbar">
      <div style={{display:"flex",gap:10,alignItems:"center",flex:1}}>
        <input className="search" placeholder="Sök eller fråga AI…" />
      </div>
      <div className="filters">
        <button onClick={()=>onRange("day")}>Idag</button>
        <button onClick={()=>onRange("week")}>Vecka</button>
        <button onClick={()=>onRange("month")}>Månad</button>
      </div>
    </header>
  );
}
