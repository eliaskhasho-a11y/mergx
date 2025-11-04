'use client';
import React, { useState } from 'react';

const POIS = [
  { id:'p1', name:'Elon Kista', city:'Stockholm', note:'Potentiell order om 20 dagar' },
  { id:'p2', name:'Mekonomen Solna', city:'Solna', note:'Befintlig kund' },
  { id:'p3', name:'Power Barkarby', city:'Järfälla', note:'Bra läge för demo' },
];

export default function Map(){
  const [q,setQ] = useState('');
  const [fs, setFs] = useState(false);
  const [notes, setNotes] = useState<Record<string,string>>({});
  const filtered = POIS.filter(p => (p.name+p.city+p.note).toLowerCase().includes(q.toLowerCase()));

  const addNote = (id:string)=>{
    const txt = prompt('Lägg till notis för platsen:') || '';
    if(!txt) return;
    setNotes(n=>({ ...n, [id]: (n[id]? n[id]+' | ':'') + txt }));
    alert('Notis sparad (mock).');
  };

  return (
    <div className="content" style={{gridTemplateColumns:'1fr'}}>
      <section className="card">
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <h3 style={{marginTop:0,flex:1}}>AI-Karta</h3>
          <button className="btn" onClick={()=>setFs(s=>!s)}>{fs?'Lämna fullskärm':'Fullskärm'}</button>
        </div>
        <div style={{display:'flex',gap:8,marginBottom:8}}>
          <input className="input" placeholder="Sök butik / område…" value={q} onChange={e=>setQ(e.target.value)} />
          <button className="btn">Skapa optimal rutt</button>
        </div>

        <div className="grid3" style={fs? {gridTemplateColumns:'1fr 1fr 1fr'}:undefined}>
          {filtered.map(p=>(
            <div className="card" key={p.id}>
              <h4>{p.name}</h4>
              <p>{p.city}</p>
              <p style={{color:'var(--muted)'}}>{p.note}</p>
              {notes[p.id] && <p><b>Notiser:</b> {notes[p.id]}</p>}
              <div style={{display:'flex',gap:8}}>
                <button className="btn" onClick={()=>addNote(p.id)}>Lägg till notis</button>
                <button className="btn" onClick={()=>alert('Rutt genererad (mock)')}>Lägg i rutt</button>
              </div>
            </div>
          ))}
        </div>
        <p style={{color:'var(--muted)', marginTop:10}}>Google Places/Directions kopplas senare (mock just nu).</p>
      </section>
    </div>
  );
}
