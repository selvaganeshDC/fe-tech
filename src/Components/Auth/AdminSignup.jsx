import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import logo from '../User/Assets/RimLogo.png';
import { useNavigate } from 'react-router-dom';
import baseurl from '../ApiService/ApiService';

const AdminSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleAdminSignup = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${baseurl}/api/admin`, {
        email,
        password
      });
      
      if (response.status === 201) {
        setError(null);
        navigate('/Auth/login'); // Redirect to login after successful registration
        alert(response.data.message);
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Registration failed');
      }
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="login-container adminsignup-container">
      <div className="login-form adminsignup-form">
        <h3>Admin Registration</h3>
        <form onSubmit={handleAdminSignup}>
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
          
          <button className="login-button adminsignup-button" type="submit">
            Register
          </button>
        </form>
        <p className="signup-link">
          <a href="/Auth/login">Back to Login</a>
        </p>
      </div>
      <div className="login-banner adminsignup-banner">
        <img src={logo} alt="Logo" className="rim-logo" />
      </div>
    </div>
  );
};

export default AdminSignup;