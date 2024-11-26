import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import logo from '../User/Assets/RimLogo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import baseurl from '../ApiService/ApiService';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${baseurl}/api/loginUser`, { email, password });
      console.log('Response data:', response.data.data);
      
      if (response.data.message === 'Login successful') {
        localStorage.setItem('userData', JSON.stringify(response.data.data));
        setError(null);
        if (response.data.role === 'admin') {
          navigate('/AdminDashboard');
        } else {
          navigate('/');
        }
        console.log('Login successful');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h3>Welcome Back</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}

          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <p className="signup-link">
          <a href="/Auth/Signup">Sign-up</a>
        </p>
      </div>
      <div className="login-banner">
        <img src={logo} alt="Logo" className="rim-logo" />
      </div>
    </div>
  );
};

export default Login;