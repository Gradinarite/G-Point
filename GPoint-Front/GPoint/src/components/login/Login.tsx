import { useState } from 'react';
import type { FormEvent } from 'react';
import { fetchUserByEmail } from '../../shared/api/user';
import type { User } from '../../shared/types/user';
import './Login.css';

interface LoginProps {
  onLoginSuccess?: (user: User) => void;
  onRegisterClick?: () => void;
}

export default function Login({ onLoginSuccess, onRegisterClick }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        setError('Please enter both email and password');
        setLoading(false);
        return;
      }

      // Fetch user by email
      const user = await fetchUserByEmail(email);

      // Note: In a real application, password verification should be done on the backend
      // For now, we'll just check if the user exists
      if (user) {
        // Login successful
        if (onLoginSuccess) {
          onLoginSuccess(user);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed. Please check your credentials.');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to GPoint</h1>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account?</p>
          <button 
            type="button"
            className="btn-secondary"
            onClick={onRegisterClick}
            disabled={loading}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}