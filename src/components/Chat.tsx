
"use client";
import React from "react";

export default function Chat(){
  return (
    <div className="content">
      <section className="card">
        <h3 style={{marginTop:0}}>Teamchatt</h3>
        <div className="chatLog" id="chatLog">
          <p>🟢 Anna: God morgon teamet!</p>
          <p>👤 Jonas: Jag tar kundmötet 11:00.</p>
        </div>
        <input className="chatInput" placeholder="Skriv ett meddelande…" onKeyDown={(e)=>{
          if(e.key==="Enter"){
            const el = document.getElementById("chatLog") as HTMLDivElement;
            el.innerHTML += `<p>💬 Du: ${e.currentTarget.value}</p>`;
            (e.currentTarget as HTMLInputElement).value="";
            el.scrollTop = el.scrollHeight;
          }
        }} />
        <div style={{marginTop:8, display:"flex", gap:8}}>
          <button>Ladda upp fil</button>
          <button>Spela in röst</button>
        </div>
      </section>
      <aside>
        <div className="card"><h3>AI-hjälp</h3><p>@AI: Sammanfatta veckan</p></div>
      </aside>
    </div>
  );
}
