'use client';
import React from 'react';

export default function AICoach(){
  return (
    <div className="card" style={{
      position:'fixed', right:16, bottom:16, background:'linear-gradient(135deg,#e0f2fe,#f0f9ff)',
      border:'1px solid #dbeafe', boxShadow:'0 10px 30px rgba(0,0,0,.08)'
    }}>
      <b>AI Coach</b>
      <p style={{maxWidth:260}}>Behöver du hjälp? Klicka på “Uppdatera med AI” i Dashboard eller generera AI-rapport i Supervisor.</p>
    </div>
  );
}
