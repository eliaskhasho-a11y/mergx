
'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Dashboard from '@/components/Dashboard';
import CRM from '@/components/CRM';
import Economy from '@/components/Economy';
import AINav from '@/components/AINav';
import Map from '@/components/Map';
import Chat from '@/components/Chat';
import Settings from '@/components/Settings';

export default function Home() {
  const [page, setPage] = useState('dashboard');
  const [range, setRange] = useState('day');

  const render = () => {
    switch(page){
      case 'dashboard': return <Dashboard />;
      case 'crm': return <CRM />;
      case 'economy': return <Economy />;
      case 'ai': return <AINav />;
      case 'map': return <Map />;
      case 'chat': return <Chat />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="container">
      <Sidebar active={page} onNavigate={setPage} />
      <div className="main">
        <Topbar onRange={setRange} />
        {render()}
      </div>
    </div>
  );
}
