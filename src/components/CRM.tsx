
"use client";
import React from "react";

export default function CRM(){
  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Kunder</h3>
        <input className="search" placeholder="Sök kund..." />
        <table className="table" style={{marginTop:8}}>
          <thead><tr><th>Namn</th><th>Org.nr</th><th>Status</th><th>AOV</th></tr></thead>
          <tbody>
            <tr><td>Elon Kista</td><td>556xxx-xxxx</td><td><span className="badge">Potentiell order (20 dagar)</span></td><td>3 900 kr</td></tr>
            <tr><td>Mekonomen Solna</td><td>556yyy-yyyy</td><td><span className="badge">Aktiv</span></td><td>4 200 kr</td></tr>
            <tr><td>Power Barkarby</td><td>556zzz-zzzz</td><td><span className="badge">Prospekt</span></td><td>–</td></tr>
          </tbody>
        </table>
      </section>
      <aside>
        <div className="card"><h3>AI-insikt</h3><p>Fokusera Norrort: högst konverteringsgrad senaste 30 dagarna.</p></div>
        <div className="card"><h3>Åtgärder</h3><ul className="list"><li>Boka demo hos Power Barkarby</li><li>Följ upp offert Mekonomen</li></ul></div>
      </aside>
    </div>
  );
}
