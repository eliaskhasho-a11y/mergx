
'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Dashboard from '@/components/Dashboard';
import Employees from '@/components/Employees';
import { useStore } from '@/lib/store';

export default function Home(){
  const page = useStore(s=>s.page);
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        {page === 'dashboard' && <Dashboard />}
        {page === 'employees' && <Employees />}
      </div>
    </div>
  );
}
