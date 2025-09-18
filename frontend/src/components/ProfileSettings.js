import React, { useState, useEffect } from 'react';
import './ProfileSettings.css';

const ProfileSettings = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    studentId: '',
    school: '',
    grade: '',
    profilePhoto: null,
    profilePhotoPreview: null
  });

  const [isChanged, setIsChanged] = useState(false);

  // Initialize form data when user or modal opens
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user?.fullName || user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        dateOfBirth: user?.dateOfBirth || '',
        studentId: user?.studentId || '',
        school: user?.school || '',
        grade: user?.grade || '',
        profilePhoto: null,
        profilePhotoPreview: user?.profilePhoto || null
      });
    }
  }, [user, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsChanged(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profilePhotoPreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
      setIsChanged(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    setIsChanged(false);
  };

  const handleCancel = () => {
    // Reset form data to original user data
    setFormData({
      fullName: user?.fullName || user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      dateOfBirth: user?.dateOfBirth || '',
      studentId: user?.studentId || '',
      school: user?.school || '',
      grade: user?.grade || '',
      profilePhoto: null,
      profilePhotoPreview: user?.profilePhoto || null
    });
    setIsChanged(false);
    onClose();
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: null,
      profilePhotoPreview: null
    }));
    setIsChanged(true);
  };

  if (!isOpen) return null;

  return (
    <div className="profile-settings-modal">
      <div className="profile-settings-overlay" onClick={onClose}></div>
      <div className="profile-settings-content">
        <div className="settings-header">
          <h2>👤 Profile Settings</h2>
          <p>Update your personal information</p>
          <button 
            className="close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          {/* Profile Photo Section */}
          <div className="photo-section">
            <label className="section-label">Profile Photo</label>
            <div className="photo-upload-area">
              <div className="current-photo">
                {formData.profilePhotoPreview ? (
                  <img 
                    src={formData.profilePhotoPreview} 
                    alt="Profile Preview" 
                    className="photo-preview"
                  />
                ) : (
                  <div className="photo-placeholder">
                    <span className="photo-icon">📸</span>
                    <p>No photo uploaded</p>
                  </div>
                )}
              </div>
              <div className="photo-actions">
                <label className="upload-btn">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                  📤 Upload Photo
                </label>
                {formData.profilePhotoPreview && (
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={removePhoto}
                  >
                    🗑️ Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter your complete address"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                placeholder="Select your date of birth"
              />
            </div>

            <div className="form-group">
              <label htmlFor="studentId">Student ID</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                placeholder="Enter your student ID"
              />
            </div>

            <div className="form-group">
              <label htmlFor="school">School/Institution</label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                placeholder="Enter your school name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="grade">Grade/Class</label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
              >
                <option value="">Select your grade</option>
                <option value="6">6th Grade</option>
                <option value="7">7th Grade</option>
                <option value="8">8th Grade</option>
                <option value="9">9th Grade</option>
                <option value="10">10th Grade</option>
                <option value="11">11th Grade</option>
                <option value="12">12th Grade</option>
                <option value="college">College</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`save-btn ${isChanged ? 'changed' : ''}`}
              disabled={!isChanged}
            >
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;