
"use client";
import React, { useMemo, useState } from "react";
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend, Tooltip);

const labels = ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"];

export default function Dashboard(){
  const [expanded, setExpanded] = useState<string|null>(null);
  const data = useMemo(()=> ({
    labels,
    datasets:[
      { label:"Intäkter", data:[180,220,260,210,320,300,240,280,330,360,400,420], borderColor:"#22c55e", tension:.4 },
      { label:"Kostnader", data:[90,120,140,130,160,170,150,155,170,190,210,220], borderColor:"#ef4444", tension:.4 },
      { label:"Vinst", data:[90,100,120,80,160,130,90,125,160,170,190,200], borderColor:"#06b6d4", tension:.4 }
    ]
  }),[]);

  return (
    <div className="content">
      <section className="card">
        <div className="kpiGrid">
          <Kpi title="Omsättning (idag)" value="125 000 kr" delta="+6 %" dir="up" onClick={()=>setExpanded("oms")} />
          <Kpi title="Ordrar (idag)" value="34" delta="+2 %" dir="up" onClick={()=>setExpanded("ord")} />
          <Kpi title="Kostnader (idag)" value="41 000 kr" delta="−1,1 %" dir="down" onClick={()=>setExpanded("kos")} />
          <Kpi title="Bruttomarginal" value="41 %" delta="+0,3 pp" dir="up" onClick={()=>setExpanded("bm")} />
        </div>
        <div className="overlaySlot">
          {expanded && <Overlay title={`AI-analys — ${expanded}`} onClose={()=>setExpanded(null)} />}
        </div>
      </section>

      <section className="card">
        <h3 style={{margin:"0 0 8px 0"}}>Ekonomi — kompositchart</h3>
        <Line data={data} options={{ plugins:{legend:{labels:{color:"#ddd"}}}, scales:{ x:{ ticks:{color:"#bbb"}, grid:{color:"rgba(255,255,255,.06)"}}, y:{ ticks:{color:"#bbb"}, grid:{color:"rgba(255,255,255,.06)"}} } }} />
      </section>

      <aside>
        <div className="card railCard">
          <h3>AI-Analys</h3>
          <p>Försäljningen ökar 12 % i norra Stockholm. Högst efterfrågan på USB‑C 60 W.</p>
        </div>
        <div className="card railCard">
          <h3>AI‑Karta (mini)</h3>
          <ul className="list">
            <li><b>Elon Kista</b> — potentiell order om 20 dagar</li>
            <li><b>Mekonomen Solna</b> — befintlig kund</li>
            <li><b>Power Barkarby</b> — bra läge för demo</li>
          </ul>
        </div>
        <div className="card railCard">
          <h3>Teamchatt</h3>
          <div className="chatLog">
            <p>🟢 Anna: God morgon teamet!</p>
            <p>👤 Jonas: Jag tar kundmötet 11:00.</p>
          </div>
          <input className="chatInput" placeholder="Skriv ett meddelande…" onKeyDown={(e)=>{
            if(e.key==="Enter"){
              const el = e.currentTarget.previousElementSibling as HTMLDivElement;
              el.innerHTML += `<p>💬 Du: ${e.currentTarget.value}</p>`;
              e.currentTarget.value = "";
              el.scrollTop = el.scrollHeight;
            }
          }} />
        </div>
      </aside>
    </div>
  );
}

function Kpi({title, value, delta, dir, onClick}:{title:string; value:string; delta:string; dir:"up"|"down"; onClick:()=>void}){
  return (
    <div className="kpi" onClick={onClick}>
      <div>{title}</div>
      <div className="value">{value}</div>
      <div className={`delta ${dir}`}>{delta}</div>
    </div>
  );
}
function Overlay({title, onClose}:{title:string; onClose:()=>void}){
  return (
    <div className="kpiOverlay">
      <div className="glass" />
      <div className="kpiPanel">
        <button className="close" onClick={onClose}>Stäng</button>
        <h3 style={{marginTop:0}}>{title}</h3>
        <p>AI: Omsättningen ökar stabilt. Fortsätt fokus på USB‑C 60 W och kampanjer i norr.</p>
        <ul className="list">
          <li>Optimera inköp Q1</li>
          <li>Kampanj B2B kablar (+12 % marginalmål)</li>
          <li>Besök 6 butiker i Norrort</li>
        </ul>
      </div>
    </div>
  );
}
