import React, { useState } from 'react';

export default function Auth({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name,            setName]            = useState('');
  const [email,           setEmail]           = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error,           setError]           = useState('');

  const toggleMode = (loginMode) => {
    setIsLogin(loginMode);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      if (!password) {
        setError('Please enter your password.');
        return;
      }
      setError('');
      onLogin(email.trim().toLowerCase(), password);
    } else {
      if (!name.trim()) {
        setError('Full Name is required.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setError('');
      onRegister({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });
    }
  };

  const fillDemo = () => {
    setEmail('admin@disastermgmt.gov');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <span className="auth-logo">🚨</span>
        <h2 className="auth-title">Disaster Management System</h2>
        <p className="auth-subtitle">
          {isLogin
            ? 'Sign in to access the command center'
            : 'Create an account to get started'}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={`tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => toggleMode(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={`tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => toggleMode(false)}
          >
            Register
          </button>
        </div>

        {error && <div className="form-error-alert">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="reg-name">Full Name *</label>
              <input
                id="reg-name"
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">Email Address *</label>
            <input
              id="auth-email"
              type="email"
              className="form-input"
              placeholder="e.g. admin@disastermgmt.gov"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Password *</label>
            <input
              id="auth-password"
              type="password"
              className="form-input"
              placeholder="Enter password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="auth-confirm">Confirm Password *</label>
              <input
                id="auth-confirm"
                type="password"
                className="form-input"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block">
            {isLogin ? '🔐 Login' : '🚀 Create Account'}
          </button>

          {isLogin && (
            <div className="demo-box">
              <span>
                Demo: <code>admin@disastermgmt.gov</code> / <code>password123</code>
              </span>
              <button type="button" className="btn-demo-fill" onClick={fillDemo}>
                Auto-fill Demo
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
