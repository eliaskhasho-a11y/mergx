'use client';
import React, { useState } from 'react';

export default function Chat() {
  const [msgs, setMsgs] = useState<string[]>([
    'Välkommen till teamchatten 👋',
  ]);
  const [text, setText] = useState('');

  const sendMsg = () => {
    if (text.trim()) {
      setMsgs([...msgs, text]);
      setText('');
    }
  };

  return (
    <div className="content">
      <section className="card">
        <h3 style={{ marginTop: 0 }}>Chatt</h3>
        <ul className="list">
          {msgs.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
        <div className="input-area" style={{ marginTop: '1rem' }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Skriv ett meddelande..."
            style={{
              width: '80%',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid #333',
              background: '#111',
              color: '#fff',
            }}
          />
          <button
            onClick={sendMsg}
            style={{
              marginLeft: '10px',
              padding: '8px 12px',
              background: '#007AFF',
              color: '#fff',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Skicka
          </button>
        </div>
      </section>
    </div>
  );
}
