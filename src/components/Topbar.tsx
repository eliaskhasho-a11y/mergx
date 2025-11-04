'use client';
import React from 'react';
export default function Topbar(){
  return (
    <header className="topbar">
      <input className="search" placeholder="Sök eller fråga AI…" />
      <div className="filters"><button>Idag</button><button>Vecka</button><button>Månad</button></div>
    </header>
  );
}
