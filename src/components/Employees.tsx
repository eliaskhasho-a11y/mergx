
'use client';
import React, { useState } from 'react';
import { useStore, type Employee } from '@/lib/store';

export default function Employees(){
  const employees = useStore(s=>s.employees);
  const add = useStore(s=>s.addEmployee);
  const update = useStore(s=>s.updateEmployee);
  const remove = useStore(s=>s.removeEmployee);

  const empty: Employee = { id:'', name:'', role:'', email:'', phone:'', revenue:0, expenses:0 };
  const [form, setForm] = useState<Employee>(empty);
  const [editing, setEditing] = useState<string|null>(null);
  const [q, setQ] = useState('');

  const filtered = employees.filter(e => (e.name+e.role+e.email).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Anställda</h3>
        <div className="formRow">
          <input className="input" placeholder="Sök…" value={q} onChange={e=>setQ(e.target.value)} />
          <button className="btn" onClick={()=>{ setForm(empty); setEditing(null); }}>Ny anställd</button>
        </div>
        <table className="table" style={{marginTop:8}}>
          <thead><tr><th>Namn</th><th>Roll</th><th>E‑post</th><th>Intäkter</th><th>Utgifter</th><th></th></tr></thead>
          <tbody>
            {filtered.map(e=> (
              <tr key={e.id}>
                <td>{e.name}</td><td>{e.role}</td><td>{e.email}</td>
                <td>{(e.revenue||0).toLocaleString('sv-SE')} kr</td>
                <td>{(e.expenses||0).toLocaleString('sv-SE')} kr</td>
                <td>
                  <button className="btn" onClick={()=>{ setForm(e); setEditing(e.id); }}>Redigera</button>
                  <button className="btn" onClick={()=>remove(e.id)}>Ta bort</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <aside>
        <div className="card">
          <h3>{editing ? 'Redigera anställd' : 'Lägg till anställd'}</h3>
          <div className="formRow"><input className="input" placeholder="Namn" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
          <div className="formRow">
            <input className="input" placeholder="Roll" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/>
            <input className="input" placeholder="E‑post" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          </div>
          <div className="formRow"><input className="input" placeholder="Telefon" value={form.phone||''} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
          <div className="formRow">
            <input className="input" placeholder="Intäkter" value={form.revenue||0} onChange={e=>setForm({...form,revenue:Number(e.target.value)||0})}/>
            <input className="input" placeholder="Utgifter" value={form.expenses||0} onChange={e=>setForm({...form,expenses:Number(e.target.value)||0})}/>
          </div>
          <div className="formRow">
            <button className="btn primary" onClick={()=>{
              if(editing){ update(editing, form); }
              else{ const id='emp_'+Math.random().toString(36).slice(2,8); add({ ...form, id }); }
              setForm({ id:'', name:'', role:'', email:'', phone:'', revenue:0, expenses:0 }); setEditing(null);
            }}>{editing ? 'Spara' : 'Lägg till'}</button>
          </div>
          <p style={{color:'var(--muted)'}}>RBAC/behörigheter kopplas i nästa sprint.</p>
        </div>
      </aside>
    </div>
  );
}
