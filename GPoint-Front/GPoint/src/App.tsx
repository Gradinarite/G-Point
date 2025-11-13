import { useState, useEffect } from 'react';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Home from './components/Home';
import type { User } from './shared/types/user';
import './App.css';

type Page = 'login' | 'register' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setCurrentPage('dashboard');
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleRegisterSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    localStorage.removeItem('currentUser');
  };

  return (
    <>
      {currentPage === 'login' && (
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onRegisterClick={() => setCurrentPage('register')}
        />
      )}
      
      {currentPage === 'register' && (
        <Register 
          onRegisterSuccess={handleRegisterSuccess}
          onLoginClick={() => setCurrentPage('login')}
        />
      )}
      
      {currentPage === 'dashboard' && currentUser && (
        <Home 
          userName={currentUser.fullName}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;