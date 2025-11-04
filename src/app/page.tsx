'use client';
import React from 'react';
import '@/styles/globals.css';

// Layout & state
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { useStore } from '@/lib/store';

// Main modules
import Dashboard from '@/components/Dashboard';
import CRM from '@/components/CRM';
import Map from '@/components/Map';
import Supervisor from '@/components/Supervisor';
import Employees from '@/components/Employees';
import Settings from '@/components/Settings';
import Economy from '@/components/Economy';
import Chat from '@/components/Chat';
import AICoach from '@/components/AICoach';
import ReportPreview from '@/components/ReportPreview';
import ApiManager from '@/components/ApiManager';

export default function Home() {
  const page = useStore((s) => s.page);

  const render = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard />;
      case 'crm':
        return <CRM />;
      case 'map':
        return <Map />;
      case 'supervisor':
        return <Supervisor />;
      case 'employees':
        return <Employees />;
      case 'settings':
        return <Settings />;
      case 'economy':
        return <Economy />;
      case 'chat':
        return <Chat />;
      case 'coach':
        return <AICoach />;
      case 'report':
        return <ReportPreview />;
      case 'api':
        return <ApiManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">{render()}</div>
      </div>
    </div>
  );
}
