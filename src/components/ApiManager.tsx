'use client';
import React, { useState } from 'react';
import { useStore } from '@/lib/store';

export default function ApiManager(){
  const apiKeys = useStore(s=>s.apiKeys);
  const apiLogs = useStore(s=>s.apiLogs);
  const addApiKey = useStore(s=>s.addApiKey);
  const updateApiKey = useStore(s=>s.updateApiKey);
  const removeApiKey = useStore(s=>s.removeApiKey);
  const testApiKey = useStore(s=>s.testApiKey);
  const actionShipment = useStore(s=>s.actionShipment);
  const actionFinanceSellInvoice = useStore(s=>s.actionFinanceSellInvoice);
  const actionWhatsApp = useStore(s=>s.actionWhatsApp);

  const [form, setForm] = useState({ name:'HuggingFace', key:'', type:'AI', description:'Gratis AI via HF' });

  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>API Manager 🔑</h3>

        <div className="grid3" style={{marginBottom:12}}>
          <div className="card">
            <b>Lägg till ny nyckel</b>
            <input className="input" placeholder="Namn (t.ex. HuggingFace)" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            <input className="input" placeholder="Nyckelvärde" value={form.key} onChange={e=>setForm({...form,key:e.target.value})}/>
            <input className="input" placeholder="Typ (AI / Maps / Comms / Finance / Shipping / Custom)" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}/>
            <input className="input" placeholder="Beskrivning" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
            <div style={{marginTop:8}}>
              <button className="btn" onClick={()=>{
                if(!form.name || !form.key){ alert('Fyll i namn och nyckel.'); return; }
                addApiKey({ name:form.name, key:form.key, type:form.type, description:form.description });
                setForm({ name:'HuggingFace', key:'', type:'AI', description:'Gratis AI via HF' });
              }}>Spara</button>
            </div>
          </div>

          <div className="card">
            <b>Snabbtest (mock)</b>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:8}}>
              <button className="btn" onClick={()=>actionShipment('MergX HQ','Kundadress',5).then(t=>alert('Tracking: '+t))}>Testa Fraktbokning</button>
              <button className="btn" onClick={()=>actionFinanceSellInvoice('INV-1001',6400).then(r=>alert(r))}>Testa Finans</button>
              <button className="btn" onClick={()=>actionWhatsApp('+4670...','Hej! Din order är på väg.').then(r=>alert(r))}>Testa WhatsApp</button>
            </div>
            <p style={{color:'var(--muted)'}}>Använder aktiv nyckeluppsättning och mockade endpoints.</p>
          </div>

          <div className="card">
            <b>Logg (senaste 10)</b>
            <ul className="list" style={{maxHeight:220,overflow:'auto'}}>
              {apiLogs.slice().reverse().map(l=>(
                <li key={l.id}>
                  <b>{l.provider}</b> — {l.action} — {l.status} ({l.latencyMs}ms)<br/>
                  <small>{new Date(l.time).toLocaleString('sv-SE')}</small><br/>
                  <small>{l.message}</small>
                </li>
              ))}
              {apiLogs.length===0 && <li>Inga anrop ännu.</li>}
            </ul>
          </div>
        </div>

        <h4>Befintliga nycklar</h4>
        <table className="table">
          <thead><tr><th>Namn</th><th>Typ</th><th>Skapad</th><th>Aktiv</th><th></th></tr></thead>
          <tbody>
            {apiKeys.map(k=>(
              <tr key={k.id}>
                <td>{k.name}</td>
                <td><span className="badge">{k.type||'Custom'}</span></td>
                <td>{new Date(k.createdAt).toLocaleString('sv-SE')}</td>
                <td>
                  <label>
                    <input type="checkbox" checked={k.active} onChange={e=>updateApiKey(k.id,{active:e.target.checked})}/> Aktiv
                  </label>
                </td>
                <td style={{display:'flex',gap:6}}>
                  <button className="btn" onClick={()=>testApiKey(k.id)}>Testa</button>
                  <button className="btn" onClick={()=>{
                    const name = prompt('Nytt namn', k.name) || k.name;
                    const key  = prompt('Ny nyckel (maskad i produktion)', k.key) || k.key;
                    const type = prompt('Typ', k.type||'Custom') || k.type || 'Custom';
                    updateApiKey(k.id, { name, key, type });
                  }}>Redigera</button>
                  <button className="btn" onClick={()=>removeApiKey(k.id)}>Ta bort</button>
                </td>
              </tr>
            ))}
            {apiKeys.length===0 && <tr><td colSpan={5}>Inga API-nycklar sparade ännu.</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  );
}
