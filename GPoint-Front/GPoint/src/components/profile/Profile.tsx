import { useState } from 'react';
import type { User } from '../../shared/types/user';
import { updateUser } from '../../shared/api/user';
import './Profile.css';

interface ProfileProps {
  user: User;
  onUserUpdate: (user: User) => void;
  onClose: () => void;
}

export default function Profile({ user, onUserUpdate, onClose }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const updatedUser = await updateUser(user.id, {
        fullName,
        email,
        role: user.role
      });

      onUserUpdate(updatedUser);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFullName(user.fullName);
    setEmail(user.email);
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-panel" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <h2>Profile</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="profile-content">
          <div className="profile-avatar-large">
            {user.fullName.charAt(0).toUpperCase()}
          </div>

          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          {!isEditing ? (
            <div className="profile-info">
              <div className="info-section">
                <h3>Account Information</h3>
                <div className="info-item">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{user.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Role</span>
                  <span className="info-value">
                    {user.role === 1 ? 'User' : user.role === 2 ? 'Specialist' : 'Admin'}
                  </span>
                </div>
              </div>

              <button 
                className="btn-edit-profile"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="profile-edit">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="button-group">
                <button 
                  className="btn-save"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  className="btn-cancel"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
