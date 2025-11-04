
"use client";
import React from "react";

export default function Map(){
  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>AI‑Karta & Rutt</h3>
        <ul className="list">
          <li>Elon Kista — 5.2 km — ETA 12 min</li>
          <li>Mekonomen Solna — 7.9 km — ETA 17 min</li>
          <li>Power Barkarby — 14.3 km — ETA 25 min</li>
        </ul>
        <button>Skapa optimal rutt</button>
      </section>
      <aside>
        <div className="card"><h3>Notiser</h3><ul className="list"><li>Elon Kista: order om 20 dagar</li><li>Mekonomen: följ upp offert</li></ul></div>
      </aside>
    </div>
  );
}
