import React from 'react';

export default function DeleteConfirmModal({ isOpen, incident, onConfirm, onCancel }) {
  if (!isOpen || !incident) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-container delete-modal" onClick={(e) => e.stopPropagation()}>
        <span className="delete-icon">⚠️</span>
        <h3>Remove Incident Record</h3>
        <p>
          Are you sure you want to permanently remove the incident{' '}
          <strong>"{incident.title}"</strong>?<br />
          This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(incident.id || incident._id)}
          >
            🗑️ Remove
          </button>
        </div>
      </div>
    </div>
  );
}
