
'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [page, setPage] = useState('dashboard');
  const [range, setRange] = useState('day');

  return (
    <div className="container">
      <Sidebar active={page} onNavigate={setPage} />
      <div className="main">
        <Topbar title={page} onRange={setRange} />
        {page === 'dashboard' && <Dashboard />}
        {page !== 'dashboard' && (
          <div style={{padding:16}}>
            <div className="card"><h3>Kommer snart</h3><p>Modulen <b>{page}</b> kopplas in i nästa sprint.</p></div>
          </div>
        )}
      </div>
    </div>
  );
}
