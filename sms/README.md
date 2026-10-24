# TalentPulse — Candidate Management System (CMS)

A clean, responsive, and modern Candidate Management System frontend built using **React.js**, **Vite**, **JavaScript**, and **CSS only**.

---

## ✨ Features Implemented

1. **Authentication with Form Validation**:
   - **Login & Registration** forms with tab switcher.
   - Comprehensive validation:
     - Name (min 2 characters).
     - Email (standard regex validation, uniqueness check across registered users).
     - Password (min 6 characters) & Confirm Password matching.
   - Convenient **Auto-fill Demo Credentials** button for instant testing.
   - Password visibility toggle (eye icon).

2. **Dashboard with Candidate Table**:
   - Clean, professional table with candidate avatar badges, initials, contact links (`mailto:` and `tel:`), job positions, and hiring stages.
   - KPI Stats Bar showcasing Total Candidates, Active Job Roles, Candidates in Review, and Scheduled Interviews.

3. **Add Candidates**:
   - Form fields: **Full Name**, **Email**, **Phone Number**, and **Job Position** (plus Hiring Stage).
   - Strict real-time and submission validation with inline error feedback.

4. **Edit & Delete Functionality**:
   - **Edit Candidate**: Reusable form pre-populates existing candidate info and updates state and localStorage.
   - **Delete Candidate**: Safe confirmation modal dialog to prevent accidental deletion.

5. **Search & Filter**:
   - Dynamic real-time search filtering by **Name** or **Email**.
   - One-click clear search button.
   - Dropdown filter by **Job Position**.
   - Friendly empty state with reset filters or add candidate action.

6. **Notification System**:
   - Real-time toast notifications for all operations (**Success**, **Error**, **Info**) with auto-dismiss (4s) and manual close button.

7. **Logout Functionality**:
   - Securely logs out the active session, clears active user state, and redirects to the sign-in screen.

8. **React useState & useEffect**:
   - Built purely with standard React hooks (`useState` and `useEffect`) for state management, localStorage synchronization, and event listener lifecycle management.

9. **Reusable Candidate Form**:
   - Dedicated [`CandidateForm.jsx`](./src/components/CandidateForm.jsx) component utilized seamlessly for both adding new candidates and editing existing candidate profiles.

10. **Professional UI & Design**:
    - Clean white background (`#ffffff` / `#f8fafc`).
    - Modern blue primary action buttons (`#2563eb`).
    - Fully responsive across mobile, tablet, and desktop devices.
    - Zero external UI libraries or CSS frameworks — pure Vanilla CSS.

11. **Local Storage & Sample Data**:
    - Pre-seeded with 6 realistic candidates and a default administrator account.
    - Stored securely in `localStorage` (`cms_candidates_data_v1`, `cms_demo_users_v1`, `cms_current_user_v1`).
    - "Reset Demo Data" button in header to reload original sample data at any time.

---

## 🔑 Demo Credentials

- **Email**: `admin@talentpulse.com`
- **Password**: `password123`
*(Or simply click **"Auto-fill"** on the Sign In page)*

---

## 🚀 How to Run the Project

1. Navigate to the project directory:
   ```bash
   cd c:/Users/ASUS/OneDrive/Desktop/vidya/sms
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

4. To build for production:
   ```bash
   npm run build
   ```

---

## 📁 Project Architecture

```
sms/
├── src/
│   ├── components/
│   │   ├── Auth.jsx                 # Login & Registration screens with validation
│   │   ├── CandidateForm.jsx        # Reusable Candidate Form (Add & Edit)
│   │   ├── CandidateModal.jsx       # Modal dialog wrapper for candidate form
│   │   ├── CandidateTable.jsx       # Table with search, filter, edit & delete
│   │   ├── DeleteConfirmModal.jsx   # Deletion confirmation modal
│   │   ├── Navbar.jsx               # Header with user avatar and Logout
│   │   ├── StatsBar.jsx             # Key recruitment metrics
│   │   └── Toast.jsx                # Toast alerts (success, error, info)
│   ├── data/
│   │   └── sampleData.js            # Initial demo users and candidates
│   ├── App.jsx                      # App logic, state, and localStorage sync
│   ├── App.css                      # Custom styling, responsive breakpoints
│   ├── index.css                    # Design system tokens and variables
│   └── main.jsx                     # Application entry point
├── index.html                       # HTML5 template with Inter font
├── package.json
└── vite.config.js
```
