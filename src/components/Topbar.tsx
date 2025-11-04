'use client';
import React from 'react';

export default function Topbar(){
  return (
    <div className="topbar">
      <input className="search" placeholder="Sök i MergX…"/>
      <div className="filters">
        <button>Idag</button>
        <button>7 dagar</button>
        <button>30 dagar</button>
      </div>
    </div>
  );
}
