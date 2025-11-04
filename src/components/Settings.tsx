
"use client";
import React from "react";

export default function Settings(){
  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Företagsinställningar</h3>
        <div className="grid2">
          <div className="card">
            <h4>Företag</h4>
            <p>Namn, org.nr, VAT, adress, bankgiro</p>
          </div>
          <div className="card">
            <h4>Fakturavillkor</h4>
            <p>Standard: 30 dagar • Serie: 2025-A • Footer: “Tack för er order.”</p>
          </div>
        </div>
        <div className="grid2" style={{marginTop:12}}>
          <div className="card">
            <h4>Frakt</h4>
            <p>Bärare: PostNord • API‑nyckel: • Upphämtningsadress: HQ</p>
          </div>
          <div className="card">
            <h4>Notifieringar</h4>
            <p>SMS/WhatsApp avsändare: “MergX”</p>
          </div>
        </div>
      </section>
      <aside>
        <div className="card"><h3>AI‑policy</h3><p>Auto-draft faktura: På • OCR‑förslag: På • Coach: Proaktiv</p></div>
      </aside>
    </div>
  );
}
