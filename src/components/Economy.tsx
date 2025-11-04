'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function Economy() {
  const [aiSummary, setAiSummary] = useState<string>('Analyserar ekonomin ...');
  const [showSummary, setShowSummary] = useState<boolean>(true);

  // 💹 Ekonomidata
  const data = {
    labels: Array.from(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']),
    datasets: [
      {
        label: 'Intäkter',
        data: [180, 220, 260, 210, 300, 280, 310, 350, 380, 400, 420, 440],
        borderColor: 'rgba(0, 255, 0, 0.8)',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: true,
        tension: 0.35,
      },
      {
        label: 'Kostnader',
        data: [90, 120, 140, 130, 160, 150, 170, 190, 200, 210, 220, 230],
        borderColor: 'rgba(255, 99, 132, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.35,
      },
      {
        label: 'Vinst',
        data: [90, 100, 120, 80, 140, 130, 140, 160, 180, 190, 200, 210],
        borderColor: 'rgba(0, 150, 255, 0.8)',
        backgroundColor: 'rgba(0, 150, 255, 0.2)',
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#ccc' },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: '#aaa' },
        grid: { color: '#222' },
      },
      y: {
        ticks: { color: '#aaa' },
        grid: { color: '#222' },
      },
    },
  };

  // 🧠 Enkel AI-analys (mock just nu)
  useEffect(() => {
    const timer = setTimeout(() => {
      setAiSummary(
        'AI-analys: Vinsten ökade med 6 % i Q3. Kostnader stabila, men AI rekommenderar ökad marknadsbudget i Q4.'
      );
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="card" style={{ color: '#fff' }}>
      <h3 style={{ marginBottom: '1rem' }}>📊 Ekonomiöversikt</h3>

      <div className="chart-container" style={{ height: 400, marginBottom: '1.5rem' }}>
        <Line data={data} options={options} />
      </div>

      <div className="ai-summary" style={{ background: '#111', padding: '1rem', borderRadius: '10px' }}>
        <h4 style={{ color: '#0ff', marginBottom: '0.5rem' }}>AI-Coach</h4>
        {showSummary ? (
          <p style={{ color: '#ccc', lineHeight: 1.5 }}>{aiSummary}</p>
        ) : (
          <p style={{ color: '#666' }}>AI-coach är pausad.</p>
        )}
        <button
          onClick={() => setShowSummary(!showSummary)}
          style={{
            marginTop: '0.8rem',
            padding: '8px 14px',
            background: '#007AFF',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {showSummary ? 'Dölj AI-analys' : 'Visa AI-analys'}
        </button>
      </div>
    </section>
  );
}
