'use client';
import React,{useState} from 'react';

export default function AICoach(){
  const [open,setOpen]=useState(false);
  const [busy,setBusy]=useState(false);
  const [input,setInput]=useState('');
  const [msgs,setMsgs]=useState<string[]>([
    'Hej 👋 Jag är AI-Coach. Fråga mig om ekonomi, kunder eller försäljning!'
  ]);

  const send=()=>{
    if(!input.trim())return;
    setBusy(true);
    const q=input;setInput('');
    setMsgs(m=>[...m,'🧍 '+q]);
    setTimeout(()=>{
      setMsgs(m=>[...m,`🤖 AI: ${q.includes('ekonomi')?'Budgeten är stabil med 12 % marginal.':'Analysen klar – allt ser bra ut!'}`]);
      setBusy(false);
    },900);
  };

  return (
    <>
      <button onClick={()=>setOpen(o=>!o)}
        style={{
          position:'fixed',bottom:20,right:20,width:54,height:54,borderRadius:'50%',
          background:'linear-gradient(135deg,#06b6d4,#2563eb)',
          border:'none',cursor:'pointer',boxShadow:'0 0 12px rgba(37,99,235,.5)'
        }}>
        {busy?<span style={{animation:'blink 1s infinite',color:'#fff'}}>●</span>:<span style={{color:'#fff',fontSize:22}}>🧠</span>}
      </button>
      {open&&(
        <div style={{
          position:'fixed',bottom:80,right:20,width:320,height:420,
          background:'var(--panel2)',border:'1px solid var(--stroke)',
          borderRadius:14,boxShadow:'0 4px 20px rgba(0,0,0,.4)',
          display:'flex',flexDirection:'column',overflow:'hidden'
        }}>
          <div style={{flex:1,overflowY:'auto',padding:10}}>
            {msgs.map((m,i)=><p key={i} style={{margin:'6px 0'}}>{m}</p>)}
          </div>
          <div style={{display:'flex',gap:6,padding:8}}>
            <input className="input" placeholder="Fråga AI-Coach…" value={input}
                   onChange={e=>setInput(e.target.value)}
                   onKeyDown={e=>e.key==='Enter'&&send()}/>
            <button className="btn" onClick={send}>Skicka</button>
          </div>
        </div>
      )}
      <style>{`@keyframes blink{50%{opacity:.3}}`}</style>
    </>
  );
}
