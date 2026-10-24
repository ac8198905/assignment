import React from 'react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type || 'info'}`}>
      <span className="toast-icon">
        {toast.type === 'error' ? '❌': toast.type === 'success' ? '✅' : 'ℹ️'}
      </span>
      <span className="toast-text">{toast.message}</span>
      <button className="toast-close-btn" onClick={onClose} aria-label="Close">
        &times;
      </button>
    </div>
  );
} 
