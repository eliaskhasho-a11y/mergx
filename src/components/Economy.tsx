'use client';
import React, { useMemo, useState } from 'react';
import { useStore } from '@/lib/store';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { exportTextAsPDF } from '@/lib/pdf';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

const QUARTERS = { 'Q1':['Jan','Feb','Mar'],'Q2':['Apr','Maj','Jun'],'Q3':['Jul','Aug','Sep'],'Q4':['Okt','Nov','Dec'],'Året':['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'] } as const;

export default function Economy(){
  const rows = useStore(s=>s.economyRows);
  const totals = useStore(s=>s.totals)();
  const [period, setPeriod] = useState<keyof typeof QUARTERS>('Året');

  const labels = QUARTERS[period];
  const data = useMemo(()=>({
    labels,
    datasets:[
      {label:'Intäkter',data:labels.map(()=>Math.round(180+Math.random()*220)),borderColor:'#16a34a',tension:.35},
      {label:'Kostnader',data:labels.map(()=>Math.round(90+Math.random()*110)),borderColor:'#dc2626',tension:.35},
    ]
  }),[period]);
  const options:any={responsive:true,plugins:{legend:{labels:{color:'#555'}}},scales:{x:{ticks:{color:'#777'}},y:{ticks:{color:'#777'}}}};

  const exportCSV = ()=>{
    const header = "name,amount,type,date\n";
    const lines = rows.map(r=>[r.name,r.amount,r.type,r.date].join(',')).join('\n');
    const blob = new Blob([header+lines],{type:'text/csv;charset=utf-8'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ekonomi.csv'; a.click();
    URL.revokeObjectURL(a.href);
  };
  const exportPDF = ()=>{
    const html = `
<h2>MergX Ekonomi – ${new Date().toLocaleDateString('sv-SE')}</h2>
<p><b>Intäkter:</b> ${totals.revenue.toLocaleString('sv-SE')} kr</p>
<p><b>Kostnader:</b> ${Math.abs(totals.cost).toLocaleString('sv-SE')} kr</p>
<p><b>Resultat:</b> ${totals.profit.toLocaleString('sv-SE')} kr</p>
<hr/>
<h3>Transaktioner</h3>
${rows.map(r=>`<p>${r.date} – ${r.name} — ${r.type} — ${r.amount.toLocaleString('sv-SE')} kr</p>`).join('')}
<small>Genererad av MergX v8.90</small>`;
    exportTextAsPDF('MergX_Ekonomi', html);
  };

  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>AI Finance – översikt</h3>
        <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
          <span>Period:</span>
          {Object.keys(QUARTERS).map(q=>(
            <button key={q} className="btn" onClick={()=>setPeriod(q as any)}>{q}</button>
          ))}
          <div style={{marginLeft:'auto',display:'flex',gap:8}}>
            <button className="btn" onClick={exportCSV}>Exportera CSV</button>
            <button className="btn" onClick={exportPDF}>Exportera PDF</button>
          </div>
        </div>
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
    </div>
  );
}
