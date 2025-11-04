'use client';
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function EconomyChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun"],
    datasets: [
      {
        label: "Intäkter (kr)",
        data: [42000, 52000, 61000, 57000, 64000, 70000],
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34,211,238,0.15)",
        tension: 0.4,
      },
      {
        label: "Kostnader (kr)",
        data: [26000, 31000, 33000, 29000, 35000, 39000],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.15)",
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "var(--text)" } },
      title: { display: false }
    },
    scales: {
      x: { ticks: { color: "var(--text)" }, grid: { color: "var(--stroke)" } },
      y: { ticks: { color: "var(--text)" }, grid: { color: "var(--stroke)" } }
    }
  };

  return (
    <div className="card">
      <h3>Ekonomisk översikt</h3>
      <Line data={data} options={options} />
    </div>
  );
}
