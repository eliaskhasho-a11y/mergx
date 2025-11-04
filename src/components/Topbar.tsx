
"use client";
import React from "react";

export default function Topbar({ onRange }:{ onRange:(r:string)=>void }){
  return (
    <header className="topbar">
      <input className="search" placeholder="Sök eller fråga AI…" />
      <div className="filters">
        <button onClick={()=>onRange("day")}>Idag</button>
        <button onClick={()=>onRange("week")}>Vecka</button>
        <button onClick={()=>onRange("month")}>Månad</button>
      </div>
    </header>
  );
}
