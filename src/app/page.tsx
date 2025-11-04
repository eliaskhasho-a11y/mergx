'use client';

import React, { useEffect } from "react";
import { useStore } from "@/lib/store";
import EconomyChart from "@/components/EconomyChart";

export default function DashboardPage() {
  const { aiBusy, runCompanyAISummary, companyAISummary } = useStore();

  return (
    <main>
      <EconomyChart />
    </main>
  );
}

  useEffect(() => {
    // Kör AI-överblick automatiskt vid första start
    if (!companyAISummary) runCompanyAISummary();
  }, []);

  return (
    <div className="dashboard">
      <h2>Översikt</h2>

      <section className="kpi-grid">
        <div className="kpi-card"><h3>Försäljning</h3><p>125 000 kr</p></div>
        <div className="kpi-card"><h3>Kostnader</h3><p>73 400 kr</p></div>
        <div className="kpi-card"><h3>Resultat</h3><p>51 600 kr</p></div>
        <div className="kpi-card"><h3>Kunder</h3><p>312</p></div>
      </section>

      <EconomyChart />

      <section className="card" style={{ marginTop: 16 }}>
        <div className="flex-between">
          <h3>AI-överblick (företagsläge)</h3>
          <button className="btn" onClick={runCompanyAISummary} disabled={aiBusy}>
            {aiBusy ? "Genererar …" : "Uppdatera överblick"}
          </button>
        </div>
        <p className="ai-text">
          {companyAISummary ||
            "Klicka på ’Uppdatera överblick’ för att generera en AI-sammanfattning av företagets läge."}
        </p>
      </section>
    </div>
  );
}
