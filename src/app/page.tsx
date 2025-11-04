'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { useStore } from '@/lib/store';
import Dashboard from '@/components/Dashboard';
import CRM from '@/components/CRM';
import Map from '@/components/Map';
import Supervisor from '@/components/Supervisor';
import Employees from '@/components/Employees';
import Settings from '@/components/Settings';
import Economy from '@/components/Economy';
import Chat from '@/components/Chat';
import AICoach from '@/components/AICoach';

export default function Home(){
  const page = useStore(s=>s.page);
  const render = ()=>{
    switch(page){
      case 'crm': return <CRM/>;
      case 'map': return <Map/>;
      case 'supervisor': return <Supervisor/>;
      case 'employees': return <Employees/>;
      case 'settings': return <Settings/>;
      case 'economy': return <Economy/>;
      case 'chat': return <Chat/>;
      default: return <Dashboard/>;
    }
  };
  return (
    <div className="container">
      <Sidebar/>
      <div className="main">
        <Topbar/>
        {render()}
        <AICoach/>
      </div>
    </div>
  );
}
