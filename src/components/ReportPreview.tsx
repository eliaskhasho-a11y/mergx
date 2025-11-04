'use client';
import React, { useRef } from 'react';
import { useStore } from '@/lib/store';
import { exportElementAsPDF } from '@/lib/pdf';

export default function ReportPreview(){
  const reportOpen = useStore(s=>s.reportOpen);
  const close = useStore(s=>s.closeReport);
  const last = useStore(s=>s.reports.slice(-1)[0]);
  const printable = useRef<HTMLDivElement>(null);

  if(!reportOpen || !last) return null;

  const exportPDF = ()=>{
    if(printable.current){
      exportElementAsPDF(last.title.replace(/\s+/g,'_'), printable.current);
    }
  };

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,.35)',
      display:'flex', alignItems:'center', justifyContent:'center', zIndex:50
    }}>
      <div style={{
        width:'min(920px,95vw)', height:'min(80vh,90vh)', background:'var(--panel)',
        border:'1px solid var(--stroke)', borderRadius:14, overflow:'hidden',
        boxShadow:'0 20px 60px rgba(0,0,0,.2)'
      }}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 12px',borderBottom:'1px solid var(--stroke)'}}>
          <b>{last.title}</b>
          <div style={{display:'flex',gap:8}}>
            <button className="btn" onClick={exportPDF}>Exportera PDF</button>
            <button className="btn" onClick={close}>Stäng</button>
          </div>
        </div>
        <div ref={printable} style={{padding:12, overflow:'auto', whiteSpace:'pre-wrap', lineHeight:1.6}}>
{last.content}
        </div>
      </div>
    </div>
  );
}
