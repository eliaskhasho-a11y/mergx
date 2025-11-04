
'use client';
import React from 'react';
import clsx from 'clsx';
import { useStore } from '@/lib/store';

const ITEMS = [
  { key: "dashboard", label: "Översikt", icon: "🏠" },
  { key: "employees", label: "Anställda", icon: "👨‍💼" }
];

export default function Sidebar(){
  const page = useStore(s=>s.page);
  const setPage = useStore(s=>s.setPage);
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo" />
        <div><h2>MergX Admin</h2><small>v8.56A • Dark</small></div>
      </div>
      <nav className="nav">
        {ITEMS.map(it=> (
          <button key={it.key} className={clsx(page===it.key && "active")} onClick={()=>setPage(it.key)}>
            <span style={{width:22,textAlign:"center"}}>{it.icon}</span><span>{it.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
