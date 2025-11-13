import { useState } from 'react';
import type { User } from '../shared/types/user';
import Settings from './Settings';
import Profile from './Profile';
import './Home.css';

interface HomeProps {
  userName: string;
  user: User;
  onLogout: () => void;
  onUserUpdate: (user: User) => void;
}

type Tab = 'home' | 'appointments' | 'settings' | 'stats';

export default function Home({ userName, user, onLogout, onUserUpdate }: HomeProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showProfile, setShowProfile] = useState(false);
  const services = [
    { id: 1, name: 'Haircut', description: 'Professional haircut service' },
    { id: 2, name: 'Massage', description: 'Relaxing massage therapy' },
    { id: 3, name: 'Consultation', description: 'Expert consultation' },
    { id: 4, name: 'Styling', description: 'Hair styling service' },
    { id: 5, name: 'Treatment', description: 'Specialized treatment' },
    { id: 6, name: 'Therapy', description: 'Therapeutic session' },
  ];

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            title="Home"
          >
            <span className="nav-icon">📋</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
            title="Appointments"
          >
            <span className="nav-icon">📅</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            title="Settings"
          >
            <span className="nav-icon">⚙️</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
            title="Statistics"
          >
            <span className="nav-icon">📊</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={onLogout} title="Logout">
            <span className="nav-icon">🚪</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header - visible on all pages */}
        <header className="content-header">
          <div className="header-left">
            <h1>{activeTab === 'home' ? `Welcome, ${userName}` : 'GPoint'}</h1>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <input type="text" placeholder="Search services..." />
              <button className="search-btn">🔍</button>
            </div>
            <button className="user-menu" onClick={() => setShowProfile(true)}>
              <div className="user-avatar-small">{userName.charAt(0).toUpperCase()}</div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        {activeTab === 'home' && (
          <section className="services-section">
            <div className="section-header">
              <h2>Available Services</h2>
              <div className="view-toggle">
                <button className="toggle-btn active">□</button>
              </div>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="card-content">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-header">
              <h2>More Services</h2>
              <div className="view-toggle">
                <button className="toggle-btn active">□</button>
              </div>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id + 10} className="service-card">
                  <div className="card-content">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'appointments' && (
          <div className="placeholder-content">
            <h1>Appointments</h1>
            <p>Your appointments will appear here</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <Settings user={user} onUserUpdate={onUserUpdate} />
        )}

        {activeTab === 'stats' && (
          <div className="placeholder-content">
            <h1>Statistics</h1>
            <p>Your statistics will appear here</p>
          </div>
        )}
      </main>

      {/* Profile Panel */}
      {showProfile && (
        <Profile 
          user={user}
          onUserUpdate={onUserUpdate}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}
