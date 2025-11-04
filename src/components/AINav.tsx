
"use client";
import React from "react";

export default function AINav(){
  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>AI-Nav & Coach</h3>
        <div className="grid3">
          <div className="card"><h4>Veckorapport</h4><p>Genereras måndag 08:00.</p></div>
          <div className="card"><h4>What‑If Studio</h4><p>Simulera pris/kampanj/lager/rutt.</p></div>
          <div className="card"><h4>Alertmatris</h4><p>DSO, marginal, lager, rutter.</p></div>
        </div>
      </section>
      <aside>
        <div className="card"><h3>Snabbinsikt</h3><p>Gross margin −1,2 pp senaste veckan — föreslår prisjustering på non‑braided.</p></div>
      </aside>
    </div>
  );
}
