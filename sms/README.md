# 🚨 Disaster Management System (DMS) — Frontend Client

The frontend client for the **Disaster Management System (DMS)**, built with **React 19**, **Vite**, **JavaScript**, and **Vanilla CSS**.

---

## ✨ Features

1. **Authentication with Validation**:
   - Tabbed **Login & Registration** forms.
   - Client-side validation: Name, Email pattern, Password length (>= 6 chars), Password match.
   - Convenient **Auto-fill Demo Credentials** button for instant testing.
   - JWT token storage in `localStorage` with automatic authorization header injection.

2. **Real-time Incident KPI Dashboard**:
   - Dynamic stats cards for:
     - 📋 **Total Incidents**
     - 🔥 **Active Now**
     - 🚨 **Critical**
     - ✅ **Resolved**
     - 🌍 **Disaster Types**

3. **Incident Management (CRUD)**:
   - **Report Incident**: Modal form with validation for Title, Disaster Type, Location, Severity, Reporter, and Notes.
   - **Edit Incident**: Pre-filled form allowing updates to description, severity, and containment status.
   - **Delete Incident**: Safety confirmation dialog to protect against accidental deletions.

4. **Live Search**:
   - Instant search filtering by Title, Location, Disaster Type, or Severity with one-click clear button.

5. **Toast Notifications**:
   - Non-intrusive animated feedback messages for successes, updates, deletions, and server errors.

6. **Responsive UI**:
   - Crafted purely with Vanilla CSS — zero external UI component libraries needed.

---

## 🔑 Demo Credentials

- **Email**: `admin@disastermgmt.gov`
- **Password**: `password123`
*(Or click **"Auto-fill"** on the Sign In page)*

---

## 🚀 Running the Frontend

1. Ensure the backend server is running on `http://localhost:5000`.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

5. To build for production:
   ```bash
   npm run build
   ```

---

## 📁 Component Structure

```
src/
├── components/
│   ├── Auth.jsx                 # Login and registration form view
│   ├── DeleteConfirmModal.jsx   # Deletion confirmation popup
│   ├── IncidentForm.jsx         # Form fields for creating/editing incidents
│   ├── IncidentModal.jsx        # Modal dialog wrapper
│   ├── IncidentTable.jsx        # Data grid with search and action buttons
│   ├── Navbar.jsx               # Header with logo, user greeting, and logout
│   ├── StatsBar.jsx             # KPI summary metric cards
│   └── Toast.jsx                # Floating toast notifications
├── services/
│   └── api.js                   # Fetch API wrapper with error handling & auth tokens
├── App.css                      # Custom styling, animations, and responsive layout
├── App.jsx                      # Main app state coordinator
├── index.css                    # Design tokens and resets
└── main.jsx                     # Application entry point
```
