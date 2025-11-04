'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

export default function Dashboard(){
  const data = {
    labels: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
    datasets: [
      { label: 'Intäkter', data: [180,220,260,210,300,240,280,310,360,400,420], borderColor:'#22c55e', tension:0.4 },
      { label: 'Kostnader', data: [90,120,140,130,160,150,155,170,180,200,215], borderColor:'#ef4444', tension:0.4 },
      { label: 'Vinst', data: [50,45,46,38,50,60,58,70,80,90,95], borderColor:'#3b82f6', tension:0.4 },
    ],
  };
  const options = { responsive:true, plugins:{ legend:{ labels:{ color:'#ccc' } } },
    scales:{ x:{ ticks:{ color:'#999' } }, y:{ ticks:{ color:'#999' } } } };

  const KPI = [
    {title:'Omsättning (idag)',value:'125 000 kr',change:'+6 %'},
    {title:'Ordrar (idag)',value:'34',change:'+2 %'},
    {title:'Kostnader (idag)',value:'41 000 kr',change:'-1,1 %'},
    {title:'Bruttomarginal',value:'41 %',change:'+0,3 pp'},
  ];

  const AIcards = [
    {place:'Elon Kista',desc:'Potentiell order om 20 dagar'},
    {place:'Mekonomen Solna',desc:'Befintlig kund'},
    {place:'Power Barkarby',desc:'Bra läge för demo'},
  ];

  return (
    <div className="content">
      <section className="grid3">
        {KPI.map((k,i)=>(
          <div key={i} className="card">
            <b>{k.title}</b>
            <div style={{fontSize:22,marginTop:4}}>{k.value}</div>
            <small style={{color:k.change.startsWith('+')?'var(--green)':'var(--red)'}}>{k.change}</small>
          </div>
        ))}
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
          {AIcards.map((a,i)=>(
            <li key={i}><b>{a.place}</b> — {a.desc}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
