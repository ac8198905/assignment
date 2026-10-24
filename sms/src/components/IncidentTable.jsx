import React from 'react';

const SEVERITY_ICONS = {
  Critical: '🔴',
  High:     '🟠',
  Medium:   '🟡',
  Low:      '🟢',
};

const STATUS_LABELS = {
  Active:     'Active',
  Contained:  'Contained',
  Resolved:   'Resolved',
};

export default function IncidentTable({
  incidents,
  searchTerm,
  onSearchChange,
  onAddIncident,
  onEditIncident,
  onDeleteIncident,
}) {
  return (
    <div className="table-container">
      {/* Toolbar */}
      <div className="table-header-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by title, location, or type..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="btn-clear"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              Clear
            </button>
          )}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onAddIncident}
        >
          🚨 Report Incident
        </button>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Incident Title</th>
              <th>Type</th>
              <th>Location</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Reported By</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-table-msg">
                  <span className="empty-table-icon">🌐</span>
                  {searchTerm
                    ? `No incidents match "${searchTerm}".`
                    : 'No incidents reported. Click "Report Incident" to log one.'}
                </td>
              </tr>
            ) : (
              incidents.map((inc) => (
                <tr key={inc.id || inc._id}>
                  <td className="cell-bold">{inc.title}</td>

                  <td>
                    <span className="badge badge-type">{inc.disasterType}</span>
                  </td>

                  <td>{inc.location}</td>

                  <td>
                    <span className={`badge badge-${(inc.severity || '').toLowerCase()}`}>
                      {SEVERITY_ICONS[inc.severity]} {inc.severity}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge badge-${(inc.status || '').toLowerCase()}`}
                    >
                      {inc.status}
                    </span>
                  </td>

                  <td>{inc.reportedBy || '—'}</td>

                  <td style={{ textAlign: 'center' }}>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="btn-sm btn-edit"
                        onClick={() => onEditIncident(inc)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-sm btn-delete"
                        onClick={() => onDeleteIncident(inc)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {incidents.length > 0 && (
        <div className="table-footer-count">
          Showing <strong>{incidents.length}</strong> incident{incidents.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
