
"use client";
import React from "react";

export default function Economy(){
  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Fakturor</h3>
        <table className="table">
          <thead><tr><th>#</th><th>Kund</th><th>Belopp</th><th>Status</th><th>Åtgärd</th></tr></thead>
          <tbody>
            <tr><td>INV-10231</td><td>Elon Kista</td><td>12 450 kr</td><td><span className="badge">Förfaller 2025-11-15</span></td><td><button>Skicka påminnelse</button></td></tr>
            <tr><td>INV-10218</td><td>Mekonomen Solna</td><td>8 990 kr</td><td><span className="badge">Betald</span></td><td><button>Export PDF</button></td></tr>
          </tbody>
        </table>
        <div className="grid2" style={{marginTop:12}}>
          <div className="card">
            <h4>Utgifter</h4>
            <ul className="list">
              <li>Circle K — 452 kr — 2025-11-03</li>
              <li>PostNord — 189 kr — 2025-11-01</li>
            </ul>
          </div>
          <div className="card">
            <h4>OCR-förslag (senaste kvitto)</h4>
            <p>Leverantör: Circle K • Belopp: 452,00 kr • Moms: 90,40</p>
            <button>Lägg som utgift</button>
          </div>
        </div>
      </section>
      <aside>
        <div className="card"><h3>AI‑rekommendation</h3><p>Sänk DSO: Skicka påminnelse + erbjud 2% cash discount.</p></div>
        <div className="card"><h3>Export</h3><ul className="list"><li>PDF för revisor</li><li>Excel detaljer</li></ul></div>
      </aside>
    </div>
  );
}
