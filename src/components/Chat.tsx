'use client';
import React, { useState } from 'react';

export default function Chat(){
  const [msgs,setMsgs] = useState<string[]>(['Välkommen till teamchatten!']);
  const [text,setText] = useState('');
  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Chatt</h3>
        <ul className="list">{msgs.map((m,i)=><li key={i}>{m}</li>)}</ul>
        <div style={{display:'flex',gap:8}}>
          <input className="input" placeholder="Skriv…” value={text} onChange={e=>setText(e.target.value)}/>
          <button className="btn" onClick={()=>{ if(text.trim()) setMsgs([...msgs,text]), setText(''); }}>Skicka</button>
        </div>
      </section>
    </div>
  );
}
