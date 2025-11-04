'use client';
import React, { useRef } from 'react';
import { useStore } from '@/lib/store';

export default function CRM(){
  const customers = useStore(s=>s.customers);
  const setNotes = useStore(s=>s.setCustomerNotes);
  const addAudio = useStore(s=>s.addAudio);
  const runCRMSummary = useStore(s=>s.runCRMSummary);
  const crmAITexts = useStore(s=>s.crmAITexts);
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadAudio = (customerId:string)=>{
    const f = fileRef.current?.files?.[0];
    if(!f) return;
    addAudio({ id:"aud_"+Math.random().toString(36).slice(2,8), customerId, fileName:f.name, duration:"00:42", summary:"AI: vill testa 60 W, uppföljning 14 dagar." });
    fileRef.current!.value='';
    alert('Ljudfil lades till (mock) och analyserades.');
  };

  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Kunder (CRM)</h3>
        <input ref={fileRef} type="file" accept="audio/*" style={{marginBottom:8}}/>
        <ul className="list">
          {customers.map(c=>(
            <li key={c.id}>
              <b>{c.name}</b> — {c.city} — {c.status}
              <div style={{marginTop:6}}><textarea className="input" placeholder="Anteckningar…" value={c.notes||''} onChange={e=>setNotes(c.id,e.target.value)} /></div>
              <div style={{marginTop:6,display:'flex',gap:6}}>
                <button className="btn" onClick={()=>uploadAudio(c.id)}>Ladda upp ljud</button>
                <button className="btn" onClick={async()=>{ await runCRMSummary(c.id); }}>Sammanfatta med AI</button>
              </div>
              {crmAITexts[c.id] && (
                <div style={{marginTop:6}} className="card">
                  <b>AI-Sammanfattning</b>
                  <div style={{whiteSpace:'pre-wrap'}}>{crmAITexts[c.id]}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
