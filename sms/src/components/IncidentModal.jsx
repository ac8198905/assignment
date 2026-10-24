import React from 'react';
import IncidentForm from './IncidentForm';

export default function IncidentModal({ isOpen, incident, onSubmit, onClose }) {
  if (!isOpen) return null;

  const isEditing = Boolean(incident && (incident.id || incident._id));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            {isEditing ? '✏️ Edit Incident' : '🚨 Report New Incident'}
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <IncidentForm
            incident={incident}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
