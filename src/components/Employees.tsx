'use client';
import React, { useState } from 'react';
import { useStore, type Employee } from '@/lib/store';

const MODULES = ['dashboard','crm','map','economy','files','chat','supervisor','api','settings'];

export default function Employees(){
  const employees = useStore(s=>s.employees);
  const add = useStore(s=>s.addEmployee);
  const update = useStore(s=>s.updateEmployee);
  const remove = useStore(s=>s.removeEmployee);
  const toggleAccess = useStore(s=>s.toggleAccess);

  const empty: Omit<Employee,"id"> = {
    name:'', email:'', role:'', phone:'', department:'', salary:0, revenue:0, expenses:0, access:[]
  };
  const [form, setForm] = useState<Omit<Employee,"id">>(empty);
  const [editing, setEditing] = useState<string|null>(null);
  const [q,setQ] = useState('');

  const filtered = employees.filter(e => (e.name+e.role+(e.email||'')).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Anställda</h3>
        <div style={{display:'flex',gap:8,marginBottom:8}}>
          <input className="input" placeholder="Sök…" value={q} onChange={e=>setQ(e.target.value)} />
          <button className="btn" onClick={()=>{ setForm(empty); setEditing(null); }}>➕ Ny anställd</button>
        </div>
        <table className="table">
          <thead><tr><th>Namn</th><th>Roll</th><th>E-post</th><th>Intäkter</th><th>Utgifter</th><th>Behörigheter</th><th></th></tr></thead>
          <tbody>
            {filtered.map(e=>(
              <tr key={e.id}>
                <td>{e.name}</td><td>{e.role}</td><td>{e.email}</td>
                <td>{(e.revenue||0).toLocaleString('sv-SE')} kr</td>
                <td>{(e.expenses||0).toLocaleString('sv-SE')} kr</td>
                <td>
                  {MODULES.map(m=>(
                    <label key={m} style={{marginRight:8}}>
                      <input type="checkbox" checked={e.access?.includes(m) || false} onChange={()=>toggleAccess(e.id,m)} /> {m}
                    </label>
                  ))}
                </td>
                <td>
                  <button className="btn" onClick={()=>{
                    setEditing(e.id);
                    const { id, ...rest } = e as any;
                    setForm(rest);
                  }}>Redigera</button>
                  <button className="btn" onClick={()=>remove(e.id)}>Ta bort</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h3>{editing ? 'Redigera anställd' : 'Lägg till anställd'}</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <input className="input" placeholder="Namn" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input className="input" placeholder="E-post" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <input className="input" placeholder="Roll" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/>
          <input className="input" placeholder="Telefon" value={form.phone||''} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <input className="input" placeholder="Avdelning" value={form.department||''} onChange={e=>setForm({...form,department:e.target.value})}/>
          <input className="input" placeholder="Lön" value={form.salary||0} onChange={e=>setForm({...form,salary:Number(e.target.value)||0})}/>
          <input className="input" placeholder="Intäkter" value={form.revenue||0} onChange={e=>setForm({...form,revenue:Number(e.target.value)||0})}/>
          <input className="input" placeholder="Utgifter" value={form.expenses||0} onChange={e=>setForm({...form,expenses:Number(e.target.value)||0})}/>
        </div>
        <div style={{marginTop:10}}>
          {MODULES.map(m=>(
            <label key={m} style={{marginRight:8}}>
              <input type="checkbox" checked={form.access?.includes(m)||false}
                onChange={()=>setForm(f=>{
                  const acc = f.access||[];
                  return acc.includes(m)? {...f, access: acc.filter(a=>a!==m)} : {...f, access:[...acc, m]};
                })}/> {m}
            </label>
          ))}
        </div>
        <div style={{marginTop:10,display:'flex',gap:8}}>
          <button className="btn" onClick={()=>{
            if(editing){ useStore.getState().updateEmployee(editing, form as any); setEditing(null); }
            else { add(form); }
            setForm(empty);
          }}>{editing?'Spara':'Lägg till'}</button>
          {editing && <button className="btn" onClick={()=>{ setEditing(null); setForm(empty); }}>Avbryt</button>}
        </div>
      </section>
    </div>
  );
}
