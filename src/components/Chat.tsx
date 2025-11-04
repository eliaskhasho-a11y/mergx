'use client';
import React, { useState, useRef, useEffect } from 'react';

type Msg = { id:string; from:'user'|'ai'; text:string };

export default function Chat(){
  const [msgs,setMsgs] = useState<Msg[]>([
    {id:'1',from:'ai',text:'Hej! Jag är din AI-assistent. Hur kan jag hjälpa dig idag?'}
  ]);
  const [input,setInput] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{ ref.current?.scrollTo(0,ref.current.scrollHeight); },[msgs]);

  const send = ()=>{
    if(!input.trim()) return;
    const userMsg:Msg={id:Math.random().toString(),from:'user',text:input};
    setMsgs(m=>[...m,userMsg]);
    setInput('');
    setTimeout(()=>{
      const reply = input.includes('@AI') ? 'Sammanfattar diskussionen: stark försäljning i Stockholm.' : 'Tack, noterat 👍';
      setMsgs(m=>[...m,{id:Math.random().toString(),from:'ai',text:reply}]);
    },700);
  };

  return (
    <div className="content" style={{gridTemplateColumns:'1fr'}}>
      <section className="card" style={{display:'flex',flexDirection:'column',height:'70vh'}}>
        <h3 style={{marginTop:0}}>Teamchatt</h3>
        <div ref={ref} style={{flex:1,overflowY:'auto',padding:'8px'}}>
          {msgs.map(m=>(
            <div key={m.id}
              style={{
                display:'flex',justifyContent:m.from==='user'?'flex-end':'flex-start',margin:'4px 0'
              }}>
              <div style={{
                maxWidth:'70%',padding:'8px 12px',
                borderRadius:'18px',whiteSpace:'pre-wrap',
                background:m.from==='user'?'#2563eb':'#06b6d4',
                color:'#fff',boxShadow:'0 2px 6px rgba(0,0,0,.3)'
              }}>{m.text}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:6}}>
          <input className="input" placeholder="Skriv ett meddelande … (@AI för sammanfattning)"
                 value={input} onChange={e=>setInput(e.target.value)}
                 onKeyDown={e=>e.key==='Enter'&&send()}/>
          <button className="btn" onClick={send}>Skicka</button>
        </div>
      </section>
    </div>
  );
}
