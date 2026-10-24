const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to make API requests with standardized error handling
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('authToken');
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMessage = data?.message || `Request failed with status ${res.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Unable to connect to backend server. Make sure it is running on http://localhost:5000'
      );
    }
    throw error;
  }
}

/** ----------------------------------------------------------------
 *  INCIDENT API  (maps to /api/incidents on the backend)
 * ---------------------------------------------------------------- */
export const incidentApi = {
  // Get all incidents (optional search keyword)
  getAll: (search = '') => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return request(`/incidents${query}`);
  },

  // Get single incident by ID
  getById: (id) => request(`/incidents/${id}`),

  // Create a new incident
  create: (incidentData) =>
    request('/incidents', {
      method: 'POST',
      body: JSON.stringify(incidentData),
    }),

  // Update an existing incident
  update: (id, incidentData) =>
    request(`/incidents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(incidentData),
    }),

  // Delete an incident
  delete: (id) =>
    request(`/incidents/${id}`, {
      method: 'DELETE',
    }),
};

/** ----------------------------------------------------------------
 *  AUTH API  (unchanged — maps to /api/auth on the backend)
 * ---------------------------------------------------------------- */
export const authApi = {
  // Login user with email & password
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  // Register new user
  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // Get all users
  getUsers: () => request('/auth/users'),
};

// Keep candidateApi as an alias for backward compatibility (can be removed later)
export const candidateApi = incidentApi;
