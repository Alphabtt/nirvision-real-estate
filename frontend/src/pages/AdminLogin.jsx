import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Server connection error');
    }
  };

  return (
    <div className="admin-container" style={{ display: 'flex', alignItems: 'center' }}>
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            placeholder="Enter Master Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p style={{ color: '#ff4d4d', marginBottom: '15px' }}>{error}</p>}
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
