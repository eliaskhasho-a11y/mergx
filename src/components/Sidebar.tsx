'use client';
import React from 'react';
import clsx from 'clsx';
import { useStore } from '@/lib/store';

const ITEMS = [
 const ITEMS = [
  {key:"dashboard",label:"Översikt",icon:"🏠"},
  {key:"crm",label:"Kunder (CRM)",icon:"👥"},
  {key:"map",label:"AI-Karta",icon:"🗺️"},
  {key:"economy",label:"Ekonomi",icon:"💰"},
  {key:"files",label:"Filer & kvitton",icon:"🧾"},
  {key:"chat",label:"Chatt",icon:"💬"},
  {key:"supervisor",label:"AI-Supervisor",icon:"🧠"},
  {key:"employees",label:"Anställda",icon:"👤"},
  {key:"api",label:"API Manager",icon:"🔑"},
  {key:"settings",label:"Inställningar",icon:"⚙️"},
];
export default function Sidebar(){
  const page = useStore(s=>s.page);
  const setPage = useStore(s=>s.setPage);
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo"/><div><h2>MergX</h2><small>v8.70</small></div>
      </div>
      <nav className="nav">
        {ITEMS.map(it=>(
          <button key={it.key} className={clsx(page===it.key&&'active')} onClick={()=>setPage(it.key)}>
            <span style={{width:22,textAlign:'center'}}>{it.icon}</span>{it.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
