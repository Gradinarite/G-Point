import './Home.css';

interface HomeProps {
  userName: string;
  onLogout: () => void;
}

export default function Home({ userName, onLogout }: HomeProps) {
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
          <button className="nav-item active">
            <span className="nav-icon">📋</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">📅</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">⚙️</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">📊</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={onLogout}>
            <span className="nav-icon">🚪</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <div className="header-left">
            <h1>Welcome, {userName}</h1>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <input type="text" placeholder="Search services..." />
              <button className="search-btn">🔍</button>
            </div>
            <button className="user-menu">
              <div className="user-avatar-small">{userName.charAt(0).toUpperCase()}</div>
            </button>
          </div>
        </header>

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
      </main>
    </div>
  );
}
