'use client';
import React from 'react';
import { useStore } from '@/lib/store';
import { exportTextAsPDF } from '@/lib/pdf';

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

  const exportReceiptPDF = (id:string)=>{
    const r = receipts.find(x=>x.id===id); if(!r) return;
    const html = `
<h2>Kvitto</h2>
<p><b>Datum:</b> ${r.date}</p>
<p><b>Leverantör:</b> ${r.supplier}</p>
<p><b>Belopp:</b> ${r.amount.toLocaleString('sv-SE')} kr</p>
<p><b>Moms:</b> ${r.vat.toLocaleString('sv-SE')} kr</p>
<p><b>Kategori:</b> ${r.category}</p>
<p><b>Status:</b> ${r.status}</p>
<small>Genererad av MergX v8.80</small>`;
    exportTextAsPDF(`Kvitto_${r.id}`, html);
  };

  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Filer & kvitton</h3>
        <div style={{display:'flex',gap:8,marginBottom:8}}>
          <button type="button" className="btn" onClick={exportCSV}>Exportera CSV</button>
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
                  <button type="button" className="btn" onClick={()=>update(r.id,{status:'Registrerad'})}>Lägg som utgift</button>
                  <button type="button" className="btn" onClick={()=>update(r.id,{status:'Ignorerad'})}>Ignorera</button>
                  <button type="button" className="btn" onClick={()=>exportReceiptPDF(r.id)}>PDF</button>
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
