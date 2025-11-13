import { useState, useEffect } from 'react';
import type { Service } from '../../shared/types/service';
import type { Slot } from '../../shared/types/slot';
import { createAppointment } from '../../shared/api/appointment';
import { fetchSlotsByServiceId } from '../../shared/api/slot';
import type { CreateAppointment } from '../../shared/types/appointment';
import './BookingModal.css';

interface BookingModalProps {
  service: Service;
  userId: string;
  onClose: () => void;
  onBookingSuccess: () => void;
}

export default function BookingModal({ service, userId, onClose, onBookingSuccess }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch available slots for the service when date is selected
  useEffect(() => {
    const loadSlots = async () => {
      if (selectedDate) {
        setLoadingSlots(true);
        setSelectedSlot(null); // Reset selected slot when date changes
        try {
          const slots = await fetchSlotsByServiceId(service.serviceId);
          
          // Filter slots for the selected date and not already booked
          const selectedDateObj = new Date(selectedDate);
          
          const filteredSlots = slots.filter(slot => {
            const slotDate = new Date(slot.startTime);
            return (
              slotDate.toDateString() === selectedDateObj.toDateString() &&
              !slot.isBooked
            );
          });
          
          setAvailableSlots(filteredSlots);
        } catch (error) {
          console.error('Failed to load slots:', error);
          setAvailableSlots([]);
        } finally {
          setLoadingSlots(false);
        }
      } else {
        setAvailableSlots([]);
        setSelectedSlot(null);
      }
    };

    loadSlots();
  }, [selectedDate, service.serviceId]);

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedSlot) {
      setError('Please select both date and time slot');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const appointmentData: CreateAppointment = {
        userId: userId,
        specialistId: service.specialistId,
        serviceId: service.serviceId,
        slotId: selectedSlot.id,
      };

      await createAppointment(appointmentData);
      onBookingSuccess();
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to book appointment';
      
      if (errorMessage.includes('500')) {
        setError('This time slot may have just been booked by someone else. Please select a different time.');
        // Reload slots to get updated availability
        try {
          const slots = await fetchSlotsByServiceId(service.serviceId);
          const selectedDateObj = new Date(selectedDate);
          const filteredSlots = slots.filter(slot => {
            const slotDate = new Date(slot.startTime);
            return (
              slotDate.toDateString() === selectedDateObj.toDateString() &&
              !slot.isBooked
            );
          });
          setAvailableSlots(filteredSlots);
          setSelectedSlot(null);
        } catch (reloadErr) {
          console.error('Failed to reload slots:', reloadErr);
        }
      } else {
        setError('Failed to book appointment. Please try again.');
      }
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="booking-header">
          <h2>Book Appointment</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="booking-content">
          <div className="service-info-display">
            <h3>{service.name}</h3>
            <p className="duration-text">Duration: {service.durationInMinutes} minutes</p>
            {service.description && <p className="service-desc">{service.description}</p>}
          </div>

          <div className="booking-form">
            <div className="form-group">
              <label>Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                disabled={loading}
              />
            </div>

            {selectedDate && (
              <div className="form-group">
                <label>Select Time</label>
                {loadingSlots ? (
                  <p>Loading available times...</p>
                ) : availableSlots.length === 0 ? (
                  <p className="no-slots">No available time slots for this date</p>
                ) : (
                  <div className="time-slots">
                    {availableSlots.map((slot) => {
                      const startTime = new Date(slot.startTime);
                      const timeString = startTime.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false 
                      });
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          className={`time-slot ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                          onClick={() => setSelectedSlot(slot)}
                          disabled={loading}
                        >
                          {timeString}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <button
              className="btn-confirm-booking"
              onClick={handleBookAppointment}
              disabled={loading || !selectedDate || !selectedSlot}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
