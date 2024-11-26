import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import logo from '../User/Assets/RimLogo.png';
import baseurl from '../ApiService/ApiService';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm_password) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/api/registerUser`, formData);
      
      if (response.status === 200) {
        setMessage('Registration successful!');
      } else {
        setMessage(response.data.message || 'Registration failed.');
      }
      
      setFormData({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-form">
          <h3>Welcome</h3>
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>User Name</label>
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirm_password" 
                value={formData.confirm_password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <button type="submit" className="signup-button">Signup</button>
          </form>
          <p className="signup-link">
            <a href="/Auth/Login">Sign-in</a>
          </p>
        </div>
        <div className="signup-banner">
          <img src={logo} alt="Logo" className="rim-logo" />
        </div>
      </div>
    </>
  );
};

export default Signup;