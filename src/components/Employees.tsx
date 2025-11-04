'use client';
import React from 'react';
import { useStore } from '@/lib/store';

const MODULES = ['dashboard','crm','map','economy','chat','supervisor','settings'];

export default function Employees(){
  const employees = useStore(s=>s.employees);
  const toggleAccess = useStore(s=>s.toggleAccess);
  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Anställda & behörigheter</h3>
        <table className="table">
          <thead><tr><th>Namn</th><th>Roll</th><th>Moduler</th></tr></thead>
          <tbody>
            {employees.map(e=>(
              <tr key={e.id}>
                <td>{e.name}</td><td>{e.role}</td>
                <td>
                  {MODULES.map(m=>(
                    <label key={m} style={{marginRight:10}}>
                      <input type="checkbox"
                        checked={e.access?.includes(m)}
                        onChange={()=>toggleAccess(e.id,m)}/> {m}
                    </label>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
