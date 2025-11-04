'use client';
import React, { useRef } from 'react';
import { useStore } from '@/lib/store';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

export default function Economy(){
  const rows = useStore(s=>s.economyRows);
  const totals = useStore(s=>s.totals)();
  const addReceipt = useStore(s=>s.addReceipt);
  const ocrExtract = useStore(s=>s.ocrExtract);
  const fileRef = useRef<HTMLInputElement>(null);

  const data = {
    labels: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
    datasets:[
      {label:'Intäkter',data:[180,220,260,210,300,240,280,310,360,400,420],borderColor:'#16a34a',tension:.35},
      {label:'Kostnader',data:[90,120,140,130,160,150,155,170,180,200,215],borderColor:'#dc2626',tension:.35},
    ]
  };
  const options:any={responsive:true,plugins:{legend:{labels:{color:'#555'}}},scales:{x:{ticks:{color:'#777'}},y:{ticks:{color:'#777'}}}};

  const onUpload = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const f = e.target.files?.[0];
    if(!f) return;
    const rec = ocrExtract(f.name);
    addReceipt(rec);
    alert(`OCR läste in kvitto: ${rec.supplier} ${rec.amount} kr (${rec.category})`);
    e.currentTarget.value = '';
  };

  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>AI Finance – översikt</h3>
        <div className="grid3">
          <div className="card"><b>Intäkter</b><div style={{fontSize:22}}>{totals.revenue.toLocaleString('sv-SE')} kr</div></div>
          <div className="card"><b>Kostnader</b><div style={{fontSize:22}}>{Math.abs(totals.cost).toLocaleString('sv-SE')} kr</div></div>
          <div className="card"><b>Resultat</b><div style={{fontSize:22}}>{totals.profit.toLocaleString('sv-SE')} kr</div></div>
        </div>
        <div className="card" style={{marginTop:12}}>
          <Line data={data} options={options}/>
        </div>
      </section>

      <section className="card" style={{marginTop:12}}>
        <h3>Transaktioner</h3>
        <table className="table">
          <thead><tr><th>Namn</th><th>Belopp</th><th>Typ</th><th>Datum</th><th>AI-coach</th></tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{r.name}</td>
                <td style={{color:r.amount>=0?'var(--green)':'var(--red)'}}>{r.amount.toLocaleString('sv-SE')} kr</td>
                <td><span className="badge">{r.type}</span></td>
                <td>{r.date}</td>
                <td>{r.amount>=0 ? 'Stabil försäljning' : 'Minska kostnad 8 % kommande kvartal'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card" style={{marginTop:12}}>
        <h3>OCR – läs in kvitto</h3>
        <input ref={fileRef} type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={onUpload}/>
        <p style={{color:'var(--muted)'}}>AI läser belopp, datum, moms och kategori (mock).</p>
      </section>
    </div>
  );
}
