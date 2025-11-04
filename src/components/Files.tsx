'use client';
import React from 'react';
import { useStore } from '@/lib/store';

export default function Files(){
  const receipts = useStore(s=>s.receipts);
  const update = useStore(s=>s.updateReceipt);

  const exportCSV = ()=>{
    const header = "id,date,supplier,amount,vat,category,status,fileName\n";
    const lines = receipts.map(r=>[r.id,r.date,r.supplier,r.amount,r.vat,r.category,r.status,r.fileName||''].join(',')).join('\n');
    const blob = new Blob([header+lines],{type:'text/csv;charset=utf-8'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'kvitton.csv'; a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Filer & kvitton</h3>
        <div style={{display:'flex',gap:8,marginBottom:8}}>
          <button className="btn" onClick={exportCSV}>Exportera CSV</button>
        </div>
        <table className="table">
          <thead><tr><th>Datum</th><th>Leverantör</th><th>Belopp</th><th>Moms</th><th>Kategori</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {receipts.map(r=>(
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.supplier}</td>
                <td>{r.amount.toLocaleString('sv-SE')} kr</td>
                <td>{r.vat.toLocaleString('sv-SE')} kr</td>
                <td>{r.category}</td>
                <td><span className="badge">{r.status}</span></td>
                <td style={{display:'flex',gap:6}}>
                  <button className="btn" onClick={()=>update(r.id,{status:'Registrerad'})}>Lägg som utgift</button>
                  <button className="btn" onClick={()=>update(r.id,{status:'Ignorerad'})}>Ignorera</button>
                </td>
              </tr>
            ))}
            {receipts.length===0 && <tr><td colSpan={7}>Inga kvitton inlästa ännu.</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  );
}
