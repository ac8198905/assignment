import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import IncidentTable from './components/IncidentTable';
import IncidentModal from './components/IncidentModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Auth from './components/Auth';
import Toast from './components/Toast';
import { incidentApi, authApi } from './services/api';
import './App.css';

export default function App() {
  // Current logged in user (restored from localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('currentUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Incidents list fetched from MongoDB backend
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);
  const [deletingIncident, setDeletingIncident] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Fetch incidents from backend API
  const fetchIncidents = useCallback(async (quiet = false) => {
    if (!currentUser) return;
    if (!quiet) setIsLoading(true);
    setIsSyncing(true);

    try {
      const data = await incidentApi.getAll();
      setIncidents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      showToast(err.message || 'Failed to fetch incidents from backend', 'error');
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  }, [currentUser, showToast]);

  // Load incidents whenever user logs in or app mounts with logged-in user
  useEffect(() => {
    if (currentUser) {
      fetchIncidents();
    }
  }, [currentUser, fetchIncidents]);

  // Sync currentUser to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    }
  }, [currentUser]);

  // Auto-dismiss toast after 3.5 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // --- Auth Handlers ---
  const handleLogin = async (email, password) => {
    try {
      const data = await authApi.login(email, password);
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      setCurrentUser(data.user);
      showToast(`Welcome back, ${data.user.name}!`, 'success');
    } catch (err) {
      showToast(err.message || 'Login failed. Please check your credentials.', 'error');
    }
  };

  const handleRegister = async (newUserData) => {
    try {
      const data = await authApi.register(newUserData);
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      setCurrentUser(data.user);
      showToast('Registration successful! Welcome to DMS.', 'success');
    } catch (err) {
      showToast(err.message || 'Registration failed.', 'error');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIncidents([]);
    setSearchTerm('');
    showToast('You have logged out.', 'info');
  };

  // --- Incident Handlers ---
  const handleOpenAdd = () => {
    setEditingIncident(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (incident) => {
    setEditingIncident(incident);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIncident(null);
  };

  // POST or PUT to backend
  const handleSaveIncident = async (formData) => {
    try {
      if (editingIncident) {
        const incidentId = editingIncident.id || editingIncident._id;
        const updated = await incidentApi.update(incidentId, formData);
        setIncidents((prev) =>
          prev.map((i) =>
            (i.id === incidentId || i._id === incidentId) ? updated : i
          )
        );
        showToast('Incident updated successfully.', 'success');
      } else {
        const created = await incidentApi.create(formData);
        setIncidents((prev) => [created, ...prev]);
        showToast('Incident reported successfully.', 'success');
      }
      handleCloseModal();
    } catch (err) {
      showToast(err.message || 'Failed to save incident.', 'error');
    }
  };

  // DELETE from backend
  const handleDeleteIncident = async (incidentId) => {
    try {
      await incidentApi.delete(incidentId);
      setIncidents((prev) => prev.filter((i) => i.id !== incidentId && i._id !== incidentId));
      setDeletingIncident(null);
      showToast('Incident removed from records.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete incident.', 'error');
    }
  };

  // Search filter by title, location, or type
  const filteredIncidents = incidents.filter((inc) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;
    return (
      (inc.title && inc.title.toLowerCase().includes(query)) ||
      (inc.location && inc.location.toLowerCase().includes(query)) ||
      (inc.disasterType && inc.disasterType.toLowerCase().includes(query)) ||
      (inc.severity && inc.severity.toLowerCase().includes(query))
    );
  });

  return (
    <div className="app">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* If not logged in, show Auth */}
      {!currentUser ? (
        <Auth onLogin={handleLogin} onRegister={handleRegister} />
      ) : (
        <div className="dashboard">
          <Navbar currentUser={currentUser} onLogout={handleLogout} />

          <main className="container">
            <div
              className="page-header"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h2>🚨 Disaster Incidents Dashboard</h2>
                <p>Monitor, report, and manage active disaster events in real-time</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="status-badge">
                  <span className="status-dot" />
                  Backend Connected
                </span>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => fetchIncidents(false)}
                  disabled={isSyncing}
                  style={{ padding: '7px 14px', fontSize: '0.83rem' }}
                  title="Reload from backend"
                >
                  {isSyncing ? '⟳ Refreshing...' : '🔄 Refresh'}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <StatsBar incidents={incidents} />

            {/* Loading state indicator */}
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔄</div>
                <div style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                  Loading incidents from database...
                </div>
              </div>
            ) : (
              /* Incident Table */
              <IncidentTable
                incidents={filteredIncidents}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAddIncident={handleOpenAdd}
                onEditIncident={handleOpenEdit}
                onDeleteIncident={(inc) => setDeletingIncident(inc)}
              />
            )}
          </main>

          {/* Reusable Form Modal (Add / Edit) */}
          <IncidentModal
            isOpen={isModalOpen}
            incident={editingIncident}
            onSubmit={handleSaveIncident}
            onClose={handleCloseModal}
          />

          {/* Delete Confirm Modal */}
          <DeleteConfirmModal
            isOpen={Boolean(deletingIncident)}
            incident={deletingIncident}
            onConfirm={handleDeleteIncident}
            onCancel={() => setDeletingIncident(null)}
          />
        </div>
      )}
    </div>
  );
}
