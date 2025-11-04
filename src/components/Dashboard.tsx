'use client';
import React from 'react';
import { useStore } from '@/lib/store';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

export default function Dashboard(){
  const kpiExpanded = useStore(s=>s.kpiExpanded);
  const setKpiExpanded = useStore(s=>s.setKpiExpanded);

  const data = {
    labels: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
    datasets: [
      { label: 'Intäkter', data: [180,220,260,210,300,240,280,310,360,400,420], borderColor:'#22c55e', tension:0.4 },
      { label: 'Kostnader', data: [90,120,140,130,160,150,155,170,180,200,215], borderColor:'#ef4444', tension:0.4 },
      { label: 'Vinst', data: [50,45,46,38,50,60,58,70,80,90,95], borderColor:'#06b6d4', tension:0.4 },
    ],
  };
  const options:any = { responsive:true, plugins:{ legend:{ labels:{ color:'#ccc' } } },
    scales:{ x:{ ticks:{ color:'#999' } }, y:{ ticks:{ color:'#999' } } } };

  const KPI = [
    {key:"oms", title:'Omsättning (idag)',value:'125 000 kr',change:'+6 %'},
    {key:"ord", title:'Ordrar (idag)',value:'34',change:'+2 %'},
    {key:"kos", title:'Kostnader (idag)',value:'41 000 kr',change:'-1,1 %'},
    {key:"bm",  title:'Bruttomarginal',value:'41 %',change:'+0,3 pp'},
  ] as const;

  return (
    <div className="content">
      <section className="card">
        <div className="grid3">
          {KPI.map(k=>(
            <div key={k.key} className="card" style={{cursor:'pointer'}} onClick={()=>setKpiExpanded(k.key as any)}>
              <b>{k.title}</b>
              <div style={{fontSize:22,marginTop:4}}>{k.value}</div>
              <small style={{color:k.change.startsWith('+')?'var(--green)':'var(--red)'}}>{k.change}</small>
            </div>
          ))}
        </div>

        {kpiExpanded && (
          <div style={{position:'relative', marginTop:12}}>
            {/* lokal 10% blur-känsla via mörk glaspanel */}
            <div style={{position:'absolute', inset:-8, backdropFilter:'blur(2px)'}} />
            <div className="card" style={{position:'relative', borderColor:'#1f2937'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h3 style={{margin:0}}>AI-analys — {labelFor(kpiExpanded)}</h3>
                <button className="btn" onClick={()=>setKpiExpanded(null)}>Stäng</button>
              </div>
              <ul className="list" style={{marginTop:8}}>
                <li>Optimera inköp Q1 (undvik lagerbrist)</li>
                <li>Kampanj B2B kablar (+12 % marginalmål)</li>
                <li>Boka demo hos toppkonton i norr</li>
              </ul>
            </div>
          </div>
        )}
      </section>

      <section className="card" style={{marginTop:14}}>
        <h3>Ekonomi — kompositchart</h3>
        <Line data={data} options={options}/>
      </section>

      <section className="card" style={{marginTop:14}}>
        <h3>AI-Analys</h3>
        <p>Försäljningen ökar 12 % i norra Stockholm. Högst efterfrågan på USB-C 60 W.</p>
      </section>

      <section className="card" style={{marginTop:14}}>
        <h3>AI-Karta (mini)</h3>
        <ul className="list">
          <li><b>Elon Kista</b> — potentiell order om 20 dagar</li>
          <li><b>Mekonomen Solna</b> — befintlig kund</li>
          <li><b>Power Barkarby</b> — bra läge för demo</li>
        </ul>
      </section>
    </div>
  );
}

function labelFor(k: "oms"|"ord"|"kos"|"bm"){
  return { oms:'Omsättning', ord:'Ordrar', kos:'Kostnader', bm:'Bruttomarginal' }[k];
}
