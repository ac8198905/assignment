import React from 'react';

const SEVERITY_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 };

export default function StatsBar({ incidents }) {
  const total = incidents.length;
  const active = incidents.filter((i) => i.status === 'Active').length;
  const critical = incidents.filter((i) => i.severity === 'Critical').length;
  const resolved = incidents.filter((i) => i.status === 'Resolved').length;
  const types = new Set(incidents.map((i) => i.disasterType).filter(Boolean)).size;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-icon">📋</span>
        <span className="stat-label">Total Incidents</span>
        <span className="stat-value">{total}</span>
      </div>

      <div className="stat-card">
        <span className="stat-icon">🔥</span>
        <span className="stat-label">Active Now</span>
        <span className="stat-value orange">{active}</span>
      </div>

      <div className="stat-card">
        <span className="stat-icon">🚨</span>
        <span className="stat-label">Critical</span>
        <span className="stat-value red">{critical}</span>
      </div>

      <div className="stat-card">
        <span className="stat-icon">✅</span>
        <span className="stat-label">Resolved</span>
        <span className="stat-value green">{resolved}</span>
      </div>

      <div className="stat-card">
        <span className="stat-icon">🌍</span>
        <span className="stat-label">Disaster Types</span>
        <span className="stat-value blue">{types}</span>
      </div>
    </div>
  );
}
