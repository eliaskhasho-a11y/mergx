
'use client';
import React, { useMemo, useState } from 'react';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend, Tooltip);
const labels = ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'];

export default function Dashboard(){
  const [expanded, setExpanded] = useState<string|null>(null);
  const data = useMemo(()=> ({
    labels,
    datasets:[
      { label:'Intäkter', data:[180,220,260,210,320,300,240,280,330,360,400,420], borderColor:'#22c55e', tension:.4 },
      { label:'Kostnader', data:[90,120,140,130,160,170,150,155,170,190,210,220], borderColor:'#ef4444', tension:.4 },
      { label:'Vinst', data:[90,100,120,80,160,130,90,125,160,170,190,200], borderColor:'#06b6d4', tension:.4 }
    ]
  }),[]);
  return (
    <div className="content">
      <section className="card">
        <div className="kpiGrid">
          <Kpi title="Omsättning (idag)" value="125 000 kr" delta="+6 %" dir="up" onClick={()=>setExpanded('oms')}/>
          <Kpi title="Ordrar (idag)" value="34" delta="+2 %" dir="up" onClick={()=>setExpanded('ord')}/>
          <Kpi title="Kostnader (idag)" value="41 000 kr" delta="−1,1 %" dir="down" onClick={()=>setExpanded('kos')}/>
          <Kpi title="Bruttomarginal" value="41 %" delta="+0,3 pp" dir="up" onClick={()=>setExpanded('bm')}/>
        </div>
        <div className="overlaySlot">{expanded && <Overlay kpi={expanded} onClose={()=>setExpanded(null)} />}</div>
      </section>
      <section className="card">
        <h3 style={{margin:'0 0 8px 0'}}>Ekonomi — kompositchart</h3>
        <Line data={data} options={{ plugins:{legend:{labels:{color:'#ddd'}}}, scales:{ x:{ ticks:{color:'#bbb'}, grid:{color:'rgba(255,255,255,.06)'}}, y:{ ticks:{color:'#bbb'}, grid:{color:'rgba(255,255,255,.06)'}} } }} />
      </section>
      <aside>
        <div className="card railCard"><h3>AI-Analys</h3><p>Försäljningen ökar 12 % i norra Stockholm. Högst efterfrågan på USB‑C 60 W.</p></div>
        <div className="card railCard"><h3>AI‑Karta (mini)</h3><ul className="list"><li><b>Elon Kista</b> — potentiell order om 20 dagar</li><li><b>Mekonomen Solna</b> — befintlig kund</li><li><b>Power Barkarby</b> — bra läge för demo</li></ul></div>
      </aside>
    </div>
  );
}
function Kpi({title,value,delta,dir,onClick}:{title:string;value:string;delta:string;dir:'up'|'down';onClick:()=>void}){
  return (<div className="kpi" onClick={onClick}><div>{title}</div><div className="value">{value}</div><div className={`delta ${dir}`}>{delta}</div></div>);
}
function Overlay({kpi,onClose}:{kpi:string; onClose:()=>void}){
  const titleMap:any = { oms:'Omsättning', ord:'Ordrar', kos:'Kostnader', bm:'Bruttomarginal' };
  return (
    <div className="kpiOverlay">
      <div className="glass" />
      <div className="kpiPanel">
        <button className="close" onClick={onClose}>Stäng</button>
        <h3 style={{marginTop:0}}>{titleMap[kpi]} — AI-analys</h3>
        <p>AI sammanfattar läget för vald KPI och föreslår åtgärder.</p>
        <ul className="list"><li>Optimera inköp Q1</li><li>Kampanj B2B kablar (+12 % marginalmål)</li><li>Boka demo hos 5 toppkonton i norr</li></ul>
      </div>
    </div>
  );
}
