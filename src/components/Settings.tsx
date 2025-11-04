'use client';
import React,{useState} from 'react';

const TABS = ['Företag','Frakt','Finans','AI-Policy','Användare','API'];

export default function Settings(){
  const [tab,setTab]=useState('Företag');
  const apiTest=(api:string)=>alert(`Mock: anslutning till ${api} lyckades.`);
  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Inställningar</h3>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:10}}>
          {TABS.map(t=><button key={t} className="btn" onClick={()=>setTab(t)}>{t}</button>)}
        </div>
        {tab==='API' && (
          <div>
            <p>Ange och testa dina API-nycklar:</p>
            <div className="grid2">
              <input className="input" placeholder="WhatsApp API-nyckel" />
              <button className="btn" onClick={()=>apiTest('WhatsApp')}>Läs API</button>
              <input className="input" placeholder="Frakt API-nyckel" />
              <button className="btn" onClick={()=>apiTest('Frakt')}>Läs API</button>
              <input className="input" placeholder="Google Maps API-nyckel" />
              <button className="btn" onClick={()=>apiTest('Google Maps')}>Läs API</button>
            </div>
          </div>
        )}
        {tab!=='API' && <p>Formulär för {tab} visas här (mock).</p>}
      </section>
    </div>
  );
}
