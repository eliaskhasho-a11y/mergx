'use client';
import React from 'react';

export default function Economy(){
  const rows = [
    { id:1, name:"Order #4502", amount:6400, type:"Inkomst", date:"2025-11-03" },
    { id:2, name:"Faktura #1123", amount:-900, type:"Utgift", date:"2025-11-02" },
  ];
  const handleExportPDF = ()=>alert('Mock: PDF skapad och nedladdad.');
  const handleExportXLSX = ()=>alert('Mock: Excel-fil exporterad.');

  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Ekonomi</h3>
        <table className="table">
          <thead><tr><th>Namn</th><th>Belopp</th><th>Typ</th><th>Datum</th><th>AI-Coach</th></tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{r.name}</td>
                <td style={{color:r.amount>=0?'var(--green)':'var(--red)'}}>
                  {r.amount.toLocaleString('sv-SE')} kr
                </td>
                <td>{r.type}</td>
                <td>{r.date}</td>
                <td>
                  {r.amount>=0
                    ? '✅ God marginal, stabil försäljning.'
                    : '⚠️ Minska utgiften – AI föreslår 12 % kostnadssänkning.'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{marginTop:10,display:'flex',gap:10}}>
          <button className="btn" onClick={handleExportPDF}>Ladda ner PDF</button>
          <button className="btn" onClick={handleExportXLSX}>Exportera Excel</button>
        </div>
      </section>
    </div>
  );
}
