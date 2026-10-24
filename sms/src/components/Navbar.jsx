import React from 'react';

export default function Navbar({ currentUser, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-logo">🚨</span>
          <span className="brand-title">Disaster Management System</span>
        </div>

        <div className="navbar-user">
          {currentUser && (
            <span className="user-greeting">
              Hello, <strong>{currentUser.name}</strong>
            </span>
          )}
          <button className="btn-outline-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
