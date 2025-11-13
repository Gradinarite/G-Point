import { useState, useEffect } from 'react';
import type { User } from '../shared/types/user';
import { UserRoles } from '../shared/types/user';
import type { Service } from '../shared/types/service';
import { fetchAllServices } from '../shared/api/service';
import { fetchUser } from '../shared/api/user';
import Settings from './Settings';
import Profile from './Profile';
import Appointments from './Appointments';
import BookingModal from './BookingModal';
import CreateServiceModal from './CreateServiceModal';
import EditServiceModal from './EditServiceModal';
import Statistics from './Statistics';
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
  const [showAvailableServices, setShowAvailableServices] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCreateServiceModal, setShowCreateServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [refreshAppointments, setRefreshAppointments] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [specialists, setSpecialists] = useState<Map<string, User>>(new Map());
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const isSpecialist = user.role === UserRoles.Specialist;

  const loadServices = async () => {
    try {
      const fetchedServices = await fetchAllServices();
      setServices(fetchedServices);
      
      // Fetch specialist details for each service
      const specialistMap = new Map<string, User>();
      for (const service of fetchedServices) {
        if (!specialistMap.has(service.specialistId)) {
          try {
            const specialist = await fetchUser(service.specialistId);
            if (specialist) {
              specialistMap.set(service.specialistId, specialist);
            }
          } catch (error) {
            // If specialist not found, create a placeholder
            console.warn(`Specialist ${service.specialistId} not found`);
          }
        }
      }
      setSpecialists(specialistMap);
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleBookAppointment = (serviceId: string) => {
    const service = services.find(s => s.serviceId === serviceId);
    if (service) {
      setSelectedService(service);
      setShowBookingModal(true);
    }
  };

  const handleBookingSuccess = () => {
    setRefreshAppointments(prev => prev + 1);
  };

  const handleServiceCreated = async () => {
    // Reload services after creating a new one
    await loadServices();
    setRefreshAppointments(prev => prev + 1);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setShowEditServiceModal(true);
  };

  const handleServiceUpdated = async () => {
    // Reload services after updating/deleting
    await loadServices();
    setRefreshAppointments(prev => prev + 1);
  };

  const filterServices = (servicesToFilter: Service[]) => {
    if (!searchQuery.trim()) {
      return servicesToFilter;
    }

    const query = searchQuery.toLowerCase();

    return servicesToFilter.filter(service => {
      // Search by service name
      if (service.name.toLowerCase().includes(query)) {
        return true;
      }

      // Search by service description
      if (service.description?.toLowerCase().includes(query)) {
        return true;
      }

      // For regular users, also search by specialist name
      if (!isSpecialist) {
        const specialist = specialists.get(service.specialistId);
        if (specialist?.fullName.toLowerCase().includes(query)) {
          return true;
        }
      }

      return false;
    });
  };

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
          {isSpecialist && (
            <button 
              className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
              title="Statistics"
            >
              <span className="nav-icon">📊</span>
            </button>
          )}
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
              <input 
                type="text" 
                placeholder={isSpecialist ? "Search my services..." : "Search services or specialists..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn">🔍</button>
            </div>
            <button className="user-menu" onClick={() => setShowProfile(true)}>
              <div className="user-avatar-small">{userName.charAt(0).toUpperCase()}</div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        {activeTab === 'home' && (
          <>
            {isSpecialist ? (
              /* Specialist View - Service Creation */
              <section className="services-section">
                <div className="section-header">
                  <h2>My Services</h2>
                  <button 
                    className="btn-create-service"
                    onClick={() => setShowCreateServiceModal(true)}
                  >
                    + Create Service
                  </button>
                </div>
                <div className="services-grid">
                  {loading ? (
                    <p>Loading services...</p>
                  ) : (() => {
                    const myServices = services.filter(s => s.specialistId === user.id);
                    const filteredServices = filterServices(myServices);
                    
                    if (myServices.length === 0) {
                      return <p>No services created yet. Click "Create Service" to add one.</p>;
                    }
                    
                    if (filteredServices.length === 0) {
                      return <p>No services match your search.</p>;
                    }
                    
                    return filteredServices.map((service) => (
                      <div key={service.serviceId} className="service-card">
                        <div className="card-content">
                          <h3>{service.name}</h3>
                          <p>{service.description || 'No description available'}</p>
                          <span className="service-duration">{service.durationInMinutes} min</span>
                          <button 
                            className="btn-edit-service"
                            onClick={() => handleEditService(service)}
                          >
                            Edit Service
                          </button>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </section>
            ) : (
              /* Regular User View - Service Booking */
              <section className="services-section">
                <div className="section-header">
                  <h2>Available Services</h2>
                  <div className="view-toggle">
                    <button 
                      className="toggle-btn"
                      onClick={() => setShowAvailableServices(!showAvailableServices)}
                      title={showAvailableServices ? "Minimize" : "Maximize"}
                    >
                      {showAvailableServices ? '−' : '+'}
                    </button>
                  </div>
                </div>

                {showAvailableServices && (
                  <div className="services-grid">
                    {loading ? (
                      <p>Loading services...</p>
                    ) : (() => {
                      const filteredServices = filterServices(services);
                      
                      if (services.length === 0) {
                        return <p>No services available</p>;
                      }
                      
                      if (filteredServices.length === 0) {
                        return <p>No services match your search.</p>;
                      }
                      
                      return filteredServices.map((service) => {
                        const specialist = specialists.get(service.specialistId);
                        return (
                          <div key={service.serviceId} className="service-card">
                            <div className="service-header">
                              <div className="specialist-info">
                                <div className="specialist-avatar">
                                  {specialist?.fullName?.charAt(0) || 'S'}
                                </div>
                                <div className="specialist-details">
                                  <span className="specialist-name">{specialist?.fullName || 'Unknown Specialist'}</span>
                                  <span className="service-duration">{service.durationInMinutes} min</span>
                                </div>
                              </div>
                            </div>
                            <div className="card-content">
                              <h3>{service.name}</h3>
                              <p>{service.description || 'No description available'}</p>
                              <button 
                                className="btn-book"
                                onClick={() => handleBookAppointment(service.serviceId)}
                              >
                                Book
                              </button>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </section>
            )}
          </>
        )}

        {activeTab === 'appointments' && (
          <Appointments 
            userId={user.id} 
            userRole={user.role} 
            key={refreshAppointments}
            onAppointmentChange={() => setRefreshAppointments(prev => prev + 1)}
          />
        )}

        {activeTab === 'settings' && (
          <Settings user={user} onUserUpdate={onUserUpdate} />
        )}

        {activeTab === 'stats' && (
          <Statistics userId={user.id} key={refreshAppointments} />
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

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <BookingModal
          service={selectedService}
          userId={user.id}
          onClose={() => setShowBookingModal(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Create Service Modal */}
      {showCreateServiceModal && (
        <CreateServiceModal
          specialistId={user.id}
          onClose={() => setShowCreateServiceModal(false)}
          onServiceCreated={handleServiceCreated}
        />
      )}

      {/* Edit Service Modal */}
      {showEditServiceModal && selectedService && (
        <EditServiceModal
          service={selectedService}
          specialistId={user.id}
          onClose={() => {
            setShowEditServiceModal(false);
            setSelectedService(null);
          }}
          onServiceUpdated={handleServiceUpdated}
        />
      )}
    </div>
  );
}
