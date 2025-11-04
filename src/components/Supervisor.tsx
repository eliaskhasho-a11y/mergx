'use client';
import React from 'react';
import { useStore } from '@/lib/store';

export default function Supervisor(){
  const alerts = useStore(s=>s.alerts);
  const reports = useStore(s=>s.reports);
  const generate = useStore(s=>s.generateReport);
  const totals = useStore(s=>s.totals)();

  return (
    <div className="content" style={{gridTemplateColumns:'1fr 420px'}}>
      <section className="card">
        <h3 style={{marginTop:0}}>AI-Supervisor</h3>
        <div className="grid2" style={{marginBottom:10}}>
          <div className="card"><b>Resultat</b><div style={{fontSize:22}}>{totals.profit.toLocaleString('sv-SE')} kr</div></div>
          <div className="card"><b>Notiser</b><div>{alerts.length} aktiva</div></div>
        </div>
        <ul className="list">{alerts.map(a=> <li key={a.id}><b>{a.type}</b>: {a.msg}</li>)}</ul>
        <div style={{marginTop:10,display:'flex',gap:8}}><button className="btn" onClick={generate}>Generera AI-rapport</button></div>
        <h4 style={{marginTop:16}}>Rapporthistorik</h4>
        <ul className="list">{reports.slice().reverse().map(r=> (<li key={r.id}><b>{r.title}</b><br/><small>{r.createdAt}</small></li>)) || <li>Inga rapporter.</li>}</ul>
      </section>
      <aside>
        <div className="card">
          <h3>Coach</h3>
          <p>Tips: Minska inköp av långsamma artiklar 8 % och fokusera bundling på 60 W i norra Stockholm.</p>
        </div>
      </aside>
    </div>
  );
}
