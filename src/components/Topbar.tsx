
'use client';
import React from 'react';
import { useStore } from '@/lib/store';
export default function Topbar(){
  const setRange = useStore(s=>s.setRange);
  return (
    <header className="topbar">
      <input className="search" placeholder="Sök eller fråga AI…" />
      <div className="filters">
        <button onClick={()=>setRange('day')}>Idag</button>
        <button onClick={()=>setRange('week')}>Vecka</button>
        <button onClick={()=>setRange('month')}>Månad</button>
      </div>
    </header>
  );
}
