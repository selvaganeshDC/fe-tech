import React, { useState } from 'react';
import userLogo from "../User/Assets/user-logo.png";
import './AdminPanel.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    aboutStore: '',
    storeAddress: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="edit-profile-container container">
      <div className="profile-header d-flex justify-content-between align-items-center mb-4">
        <h1 className="profile-title">Edit Profile</h1>
      </div>

      <div className="image-section d-flex align-items-center gap-3 mb-4">
        <img 
          src={userLogo}
          alt="Profile" 
          className="profile-image"
        />
        <div className="profile-actions d-flex gap-2">
          <button className="btn edit-btn">Edit Profile</button>
          <button className="btn remove-btn">Remove</button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control custom-input"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="form-control custom-input"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control custom-input"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">About Store</label>
          <input
            type="text"
            name="aboutStore"
            value={formData.aboutStore}
            onChange={handleInputChange}
            className="form-control custom-input"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Store Address</label>
          <input
            type="text"
            name="storeAddress"
            value={formData.storeAddress}
            onChange={handleInputChange}
            className="form-control custom-input"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;