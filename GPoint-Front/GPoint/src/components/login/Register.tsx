import { useState } from 'react';
import type { FormEvent } from 'react';
import { createUser } from '../../shared/api/user';
import type { CreateUser, User, UserRole } from '../../shared/types/user';
import { UserRoles } from '../../shared/types/user';
import { useToast } from '../../shared/components/ToastContext';
import { useTranslation } from '../../shared/contexts/TranslationContext';
import { isValidEmail, isValidName, isStrongPassword, getPasswordStrengthMessage } from '../../shared/utils/validation';
import './Register.css';

interface RegisterProps {
  onRegisterSuccess?: (user: User) => void;
  onLoginClick?: () => void;
}

export default function Register({ onRegisterSuccess, onLoginClick }: RegisterProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRoles.User);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const { showError, showSuccess } = useToast();
  const { t } = useTranslation();

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    // Get password strength message and translate it
    const strengthMsg = getPasswordStrengthMessage(newPassword);
    if (strengthMsg) {
      const strengthKey = strengthMsg.includes('Strong') ? 'passwordStrength.strong' : 
                         strengthMsg.includes('least 8') ? 'passwordStrength.atLeast8' :
                         strengthMsg.includes('uppercase') ? 'passwordStrength.needUppercase' :
                         strengthMsg.includes('lowercase') ? 'passwordStrength.needLowercase' :
                         'passwordStrength.needNumber';
      setPasswordStrength(t(strengthKey));
    } else {
      setPasswordStrength('');
    }
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError(t('error.fillAllFields'));
      return;
    }

    if (!isValidName(fullName)) {
      setError(t('error.validFullName'));
      return;
    }

    if (!isValidEmail(email)) {
      setError(t('error.validEmail'));
      return;
    }

    if (!isStrongPassword(password)) {
      setError(t('error.passwordRequirements'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('error.passwordsMatch'));
      return;
    }

    setLoading(true);

    try {
      // Create user data
      const userData: CreateUser = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        role
      };

      // Create user
      const createdUser = await createUser(userData);

      // Registration successful
      showSuccess(`${t('toast.registerSuccess')}, ${createdUser.fullName}!`);
      if (onRegisterSuccess) {
        onRegisterSuccess(createdUser);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('error.registrationFailed');
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">{t('auth.createAccount')}</h1>
        <p className="register-subtitle">{t('auth.joinGPoint')}</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="fullName">{t('auth.fullName')}</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setError('');
              }}
              placeholder={t('auth.fullName')}
              required
              disabled={loading}
              autoComplete="name"
            />
          </div>

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
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder={t('auth.password')}
              required
              disabled={loading}
              autoComplete="new-password"
            />
            {passwordStrength && (
              <small className={`password-strength ${passwordStrength.includes(t('passwordStrength.strong')) ? 'strong' : 'weak'}`}>
                {passwordStrength}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">{t('auth.confirmPassword')}</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              placeholder={t('auth.confirmPassword')}
              required
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">{t('auth.accountType')}</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(Number(e.target.value) as UserRole)}
              disabled={loading}
            >
              <option value={UserRoles.User}>{t('auth.user')}</option>
              <option value={UserRoles.Specialist}>{t('auth.specialist')}</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? t('auth.creatingAccount') : t('auth.createAccountButton')}
          </button>
        </form>

        <div className="register-footer">
          <p>{t('auth.haveAccount')}</p>
          <button 
            type="button"
            className="btn-secondary"
            onClick={onLoginClick}
            disabled={loading}
          >
            {t('auth.signInButton')}
          </button>
        </div>
      </div>
    </div>
  );
}