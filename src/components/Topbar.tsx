'use client';
import React, { useEffect, useState } from "react";

export default function Topbar() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  return (
    <div className="topbar">
      <input className="search" placeholder="Sök i MergX…" />
      <div className="filters">
        <button onClick={() => setLight(l => !l)}>
          {light ? "Mörkt tema" : "Ljust tema"}
        </button>
      </div>
    </div>
  );
}
