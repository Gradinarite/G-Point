import { useState, useEffect } from 'react';
import { fetchAppointmentsByUserId, fetchAppointmentsBySpecialistId, cancelAppointment, completeAppointment } from '../../shared/api/appointment';
import { fetchUser } from '../../shared/api/user';
import { fetchService } from '../../shared/api/service';
import { fetchSlot } from '../../shared/api/slot';
import type { Appointment } from '../../shared/types/appointment';
import type { User } from '../../shared/types/user';
import { UserRoles } from '../../shared/types/user';
import type { Service } from '../../shared/types/service';
import type { Slot } from '../../shared/types/slot';
import './Appointments.css';

interface AppointmentsProps {
  userId: string;
  userRole?: number;
  onAppointmentChange?: () => void;
}

interface AppointmentWithDetails extends Appointment {
  clientName?: string;
  specialistName?: string;
  serviceName?: string;
  slotDetails?: Slot;
}

interface ServiceGroup {
  serviceId: string;
  serviceName: string;
  appointments: AppointmentWithDetails[];
}

export default function Appointments({ userId, userRole, onAppointmentChange }: AppointmentsProps) {
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);

  const isSpecialist = userRole === UserRoles.Specialist;

  useEffect(() => {
    loadAppointments();
  }, [userId]);

  const loadAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch appointments based on user role
      const data = isSpecialist 
        ? await fetchAppointmentsBySpecialistId(userId)
        : await fetchAppointmentsByUserId(userId);
      
      // Filter appointments based on role:
      // - Regular users: only scheduled (status=1 or no status for legacy)
      // - Specialists: only scheduled (1), hide completed (2) and cancelled (3)
      const filteredData = data.filter(apt => apt.status === 1 || !apt.status);
      
      // Fetch details for each appointment
      const appointmentsWithDetails = await Promise.all(
        filteredData.map(async (appointment) => {
          try {
            const service = await fetchService(appointment.serviceId);
            const slot = await fetchSlot(appointment.slotId);

            // For specialists, fetch client info; for users, fetch specialist info
            const otherUserId = isSpecialist ? appointment.userId : appointment.specialistId;
            const otherUser = await fetchUser(otherUserId);
            
            return {
              ...appointment,
              serviceName: service.name,
              slotDetails: slot,
              ...(isSpecialist 
                ? { clientName: otherUser.fullName }
                : { specialistName: otherUser.fullName }
              )
            };
          } catch (err) {
            console.error('Failed to fetch appointment details:', err);
            return appointment;
          }
        })
      );
      
      setAppointments(appointmentsWithDetails);

      // Group appointments by service for specialists
      if (isSpecialist) {
        const grouped = appointmentsWithDetails.reduce((acc, appointment) => {
          const appt = appointment as AppointmentWithDetails;
          if (!appt.serviceName) return acc;
          
          const serviceId = appt.serviceId;
          const existing = acc.find(g => g.serviceId === serviceId);
          
          if (existing) {
            existing.appointments.push(appt);
          } else {
            acc.push({
              serviceId,
              serviceName: appt.serviceName,
              appointments: [appt]
            });
          }
          
          return acc;
        }, [] as ServiceGroup[]);

        // Sort appointments within each group by date
        grouped.forEach(group => {
          group.appointments.sort((a, b) => {
            const dateA = a.slotDetails ? new Date(a.slotDetails.startTime).getTime() : 0;
            const dateB = b.slotDetails ? new Date(b.slotDetails.startTime).getTime() : 0;
            return dateA - dateB;
          });
        });

        setServiceGroups(grouped);
      }
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    setCancellingId(appointmentId);
    try {
      await cancelAppointment(appointmentId);
      // Reload appointments after cancellation
      await loadAppointments();
      // Notify parent to refresh other components
      onAppointmentChange?.();
    } catch (err) {
      setError('Failed to cancel appointment');
      console.error('Cancel error:', err);
    } finally {
      setCancellingId(null);
    }
  };

  const handleCompleteAppointment = async (appointmentId: string) => {
    if (!confirm('Mark this appointment as completed?')) {
      return;
    }

    setCompletingId(appointmentId);
    try {
      await completeAppointment(appointmentId);
      // Reload appointments after completion
      await loadAppointments();
      // Notify parent to refresh other components
      onAppointmentChange?.();
    } catch (err) {
      setError('Failed to complete appointment');
      console.error('Complete error:', err);
    } finally {
      setCompletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusClass = (status: number) => {
    switch (status) {
      case 1: return 'status-scheduled';
      case 2: return 'status-completed';
      case 3: return 'status-cancelled';
      default: return '';
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 1: return 'Scheduled';
      case 2: return 'Completed';
      case 3: return 'Cancelled';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="appointments-container">
        <div className="appointments-header">
          <h1>My Appointments</h1>
        </div>
        <div className="loading-state">Loading appointments...</div>
      </div>
    );
  }

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>{isSpecialist ? 'My Appointments Calendar' : 'My Appointments'}</h1>
        <p>{isSpecialist ? 'View appointments organized by service' : 'View and manage your scheduled appointments'}</p>
      </div>

      <div className="appointments-content">
        {error && <div className="error-message">{error}</div>}

        {appointments.length === 0 ? (
          <div className="empty-state">
            <p>{isSpecialist ? "You don't have any appointments yet." : "You don't have any appointments yet."}</p>
            <p>{isSpecialist ? "Clients will book your services." : "Book a service to get started!"}</p>
          </div>
        ) : isSpecialist ? (
          /* Specialist View - Grouped by Service */
          <div className="service-groups">
            {serviceGroups.map((group) => (
              <div key={group.serviceId} className="service-group">
                <div className="service-group-header">
                  <h2>{group.serviceName}</h2>
                  <span className="appointment-count">{group.appointments.length} appointment{group.appointments.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="appointments-grid">
                  {group.appointments.map((appointment) => {
                    const appointmentDate = appointment.slotDetails 
                      ? new Date(appointment.slotDetails.startTime)
                      : null;
                    
                    return (
                      <div key={appointment.id} className="appointment-card specialist-card">
                        <div className="appointment-header">
                          <div className="appointment-date">
                            <span className="date-day">
                              {appointmentDate ? appointmentDate.toLocaleDateString('en-US', { weekday: 'short' }) : 'N/A'}
                            </span>
                            <span className="date-full">
                              {appointmentDate ? appointmentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBD'}
                            </span>
                          </div>
                          <span className="appointment-status status-scheduled">
                            Scheduled
                          </span>
                        </div>
                        <div className="appointment-body">
                          <h3>{appointment.clientName || 'Client'}</h3>
                          <p className="appointment-time">
                            <span className="time-icon">🕐</span>
                            {appointmentDate ? appointmentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Time TBD'}
                          </p>
                          {(appointment.status === 1 || !appointment.status) && (
                            <div className="appointment-actions">
                              <button 
                                className="btn-complete-appointment"
                                onClick={() => handleCompleteAppointment(appointment.id)}
                                disabled={completingId === appointment.id}
                              >
                                {completingId === appointment.id ? 'Completing...' : 'Mark as Complete'}
                              </button>
                              <button 
                                className="btn-cancel-appointment"
                                onClick={() => handleCancelAppointment(appointment.id)}
                                disabled={cancellingId === appointment.id}
                              >
                                {cancellingId === appointment.id ? 'Cancelling...' : 'Cancel'}
                              </button>
                            </div>
                          )}
                          {appointment.status === 2 && (
                            <div className="status-badge completed-badge">✓ Completed</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* User View - List of Appointments */
          <div className="appointments-grid">
            {appointments.map((appointment) => {
              const appointmentDate = appointment.slotDetails 
                ? new Date(appointment.slotDetails.startTime)
                : null;
              
              return (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <div className="appointment-date">
                      <span className="date-day">
                        {appointmentDate ? appointmentDate.toLocaleDateString('en-US', { weekday: 'short' }) : 'N/A'}
                      </span>
                      <span className="date-full">
                        {appointmentDate ? appointmentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBD'}
                      </span>
                    </div>
                    <span className="appointment-status status-scheduled">
                      Scheduled
                    </span>
                  </div>
                  <div className="appointment-body">
                    <h3>{appointment.serviceName || 'Service'}</h3>
                    <p className="appointment-time">
                      <span className="time-icon">🕐</span>
                      {appointmentDate ? appointmentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Time TBD'}
                    </p>
                    <p className="appointment-specialist">
                      with {appointment.specialistName || 'Specialist'}
                    </p>
                    <button 
                      className="btn-cancel-appointment"
                      onClick={() => handleCancelAppointment(appointment.id)}
                      disabled={cancellingId === appointment.id}
                    >
                      {cancellingId === appointment.id ? 'Cancelling...' : 'Cancel Appointment'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
