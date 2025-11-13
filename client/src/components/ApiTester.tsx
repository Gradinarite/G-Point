import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

type AuthView = 'login' | 'register';

export function ApiTester() {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const handleLogin = async (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    // TODO: Integrate with your API from shared/api
    alert(`Login attempted with: ${email}`);
  };

  const handleRegister = async (email: string, password: string, confirmPassword: string) => {
    console.log('Register attempt:', { email, password, confirmPassword });
    // TODO: Integrate with your API from shared/api
    alert(`Registration attempted with: ${email}`);
  };

  return (
    <div>
      {currentView === 'login' ? (
        <Login
          onSwitchToRegister={() => setCurrentView('register')}
          onLogin={handleLogin}
        />
      ) : (
        <Register
          onSwitchToLogin={() => setCurrentView('login')}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
}

