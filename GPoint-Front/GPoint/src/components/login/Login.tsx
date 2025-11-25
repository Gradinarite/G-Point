import { useState } from 'react';
import type { FormEvent } from 'react';
import { validateCredentials } from '../../shared/api/user';
import type { User } from '../../shared/types/user';
import { useToast } from '../../shared/components/ToastContext';
import { useTranslation } from '../../shared/contexts/TranslationContext';
import { isValidEmail } from '../../shared/utils/validation';
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
  const { showError, showSuccess } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!email.trim() || !password) {
      setError(t('error.fillAllFields'));
      return;
    }

    if (!isValidEmail(email)) {
      setError(t('error.validEmail'));
      return;
    }

    setLoading(true);

    try {
      // Validate credentials with backend
      const user = await validateCredentials(email, password);

      // Login successful
      showSuccess(`${t('toast.loginSuccess')}, ${user.fullName}!`);
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">{t('auth.welcome')}</h1>
        <p className="login-subtitle">{t('auth.signIn')}</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder={t('auth.email')}
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('auth.password')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder={t('auth.password')}
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? t('auth.signingIn') : t('auth.signInButton')}
          </button>
        </form>

        <div className="login-footer">
          <p>{t('auth.noAccount')}</p>
          <button 
            type="button"
            className="btn-secondary"
            onClick={onRegisterClick}
            disabled={loading}
          >
            {t('auth.createAccount')}
          </button>
        </div>
      </div>
    </div>
  );
}