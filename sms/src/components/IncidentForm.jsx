import React, { useState, useEffect } from 'react';

const DISASTER_TYPES = [
  'Flood',
  'Earthquake',
  'Hurricane / Cyclone',
  'Wildfire',
  'Tsunami',
  'Landslide',
  'Drought',
  'Tornado',
  'Industrial Accident',
  'Disease Outbreak',
  'Building Collapse',
  'Other',
];

const SEVERITIES = ['Critical', 'High', 'Medium', 'Low'];
const STATUSES   = ['Active', 'Contained', 'Resolved'];

export default function IncidentForm({ incident, onSubmit, onCancel }) {
  const [title,        setTitle]        = useState('');
  const [disasterType, setDisasterType] = useState('');
  const [location,     setLocation]     = useState('');
  const [severity,     setSeverity]     = useState('');
  const [status,       setStatus]       = useState('Active');
  const [reportedBy,   setReportedBy]   = useState('');
  const [description,  setDescription]  = useState('');
  const [error,        setError]        = useState('');

  useEffect(() => {
    if (incident) {
      setTitle(incident.title || '');
      setDisasterType(incident.disasterType || '');
      setLocation(incident.location || '');
      setSeverity(incident.severity || '');
      setStatus(incident.status || 'Active');
      setReportedBy(incident.reportedBy || '');
      setDescription(incident.description || '');
    } else {
      setTitle('');
      setDisasterType('');
      setLocation('');
      setSeverity('');
      setStatus('Active');
      setReportedBy('');
      setDescription('');
    }
    setError('');
  }, [incident]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Incident title is required.');
      return;
    }
    if (!disasterType) {
      setError('Please select a disaster type.');
      return;
    }
    if (!location.trim()) {
      setError('Location is required.');
      return;
    }
    if (!severity) {
      setError('Please select a severity level.');
      return;
    }
    if (!reportedBy.trim()) {
      setError('Reported by field is required.');
      return;
    }

    setError('');
    onSubmit({
      title: title.trim(),
      disasterType,
      location: location.trim(),
      severity,
      status,
      reportedBy: reportedBy.trim(),
      description: description.trim(),
    });
  };

  const isEditing = Boolean(incident && (incident.id || incident._id));

  return (
    <form className="incident-form" onSubmit={handleSubmit}>
      {error && <div className="form-error-alert">⚠️ {error}</div>}

      {/* Title */}
      <div className="form-group">
        <label htmlFor="inc-title">Incident Title *</label>
        <input
          id="inc-title"
          type="text"
          className="form-input"
          placeholder="e.g. Major Flooding in River District"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Type + Location */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="inc-type">Disaster Type *</label>
          <select
            id="inc-type"
            className="form-select"
            value={disasterType}
            onChange={(e) => setDisasterType(e.target.value)}
          >
            <option value="">-- Select Type --</option>
            {DISASTER_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inc-location">Location *</label>
          <input
            id="inc-location"
            type="text"
            className="form-input"
            placeholder="e.g. District 4, Chennai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Severity + Status */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="inc-severity">Severity Level *</label>
          <select
            id="inc-severity"
            className="form-select"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="">-- Select Severity --</option>
            {SEVERITIES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inc-status">Status *</label>
          <select
            id="inc-status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reported By */}
      <div className="form-group">
        <label htmlFor="inc-reported-by">Reported By *</label>
        <input
          id="inc-reported-by"
          type="text"
          className="form-input"
          placeholder="e.g. Field Officer / Agency Name"
          value={reportedBy}
          onChange={(e) => setReportedBy(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="inc-desc">Description / Notes</label>
        <textarea
          id="inc-desc"
          className="form-textarea"
          placeholder="Provide additional details about the incident..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {isEditing ? '✏️ Update Incident' : '🚨 Report Incident'}
        </button>
      </div>
    </form>
  );
}
