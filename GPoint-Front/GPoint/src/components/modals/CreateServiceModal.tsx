import { useState } from 'react';
import { createService } from '../../shared/api/service';
import { createSlot } from '../../shared/api/slot';
import type { CreateService } from '../../shared/types/service';
import type { CreateSlot } from '../../shared/types/slot';
import { useToast } from '../../shared/components/ToastContext';
import { isValidServiceName, isValidDuration, isEndTimeAfterStartTime, isNotPastDate } from '../../shared/utils/validation';
import './CreateServiceModal.css';

interface CreateServiceModalProps {
  specialistId: string;
  onClose: () => void;
  onServiceCreated: () => void;
}

interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
}

export default function CreateServiceModal({ specialistId, onClose, onServiceCreated }: CreateServiceModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [durationInMinutes, setDurationInMinutes] = useState(30);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [currentSlot, setCurrentSlot] = useState<TimeSlot>({
    date: '',
    startTime: '',
    endTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showSuccess, showError } = useToast();

  const handleAddTimeSlot = () => {
    setError('');

    if (!currentSlot.date || !currentSlot.startTime || !currentSlot.endTime) {
      setError('Please fill in all time slot fields');
      return;
    }

    if (!isNotPastDate(currentSlot.date)) {
      setError('Cannot create slots for past dates');
      return;
    }

    if (!isEndTimeAfterStartTime(currentSlot.startTime, currentSlot.endTime)) {
      setError('End time must be after start time');
      return;
    }

    setTimeSlots([...timeSlots, currentSlot]);
    setCurrentSlot({ date: '', startTime: '', endTime: '' });
  };

  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('Service name is required');
      return;
    }

    if (!isValidServiceName(name)) {
      setError('Service name must be between 3 and 100 characters');
      return;
    }

    if (!isValidDuration(durationInMinutes)) {
      setError('Duration must be between 15 minutes and 8 hours');
      return;
    }

    if (timeSlots.length === 0) {
      setError('Please add at least one time slot');
      return;
    }

    setLoading(true);

    try {
      const serviceData: CreateService = {
        name: name.trim(),
        description: description.trim() || undefined,
        durationInMinutes,
        specialistId
      };

      const createdService = await createService(serviceData);

      // Create all time slots for the service
      for (const slot of timeSlots) {
        const slotData: CreateSlot = {
          serviceId: createdService.serviceId,
          specialistId,
          startTime: `${slot.date}T${slot.startTime}:00`,
          endTime: `${slot.date}T${slot.endTime}:00`
        };
        await createSlot(slotData);
      }

      showSuccess('Service created successfully!');
      onServiceCreated();
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to create service. Please try again.';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Service</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form className="service-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Service Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Haircut, Massage, Consultation"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your service..."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Duration (minutes) *</label>
            <input
              type="number"
              value={durationInMinutes}
              onChange={(e) => setDurationInMinutes(Number(e.target.value))}
              min="15"
              max="480"
              step="15"
              required
            />
          </div>

          <div className="form-section">
            <h3>Time Slots</h3>
            <p className="section-description">Add available time slots for this service</p>
            
            <div className="time-slot-input">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={currentSlot.date}
                  onChange={(e) => setCurrentSlot({ ...currentSlot, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="form-group">
                <label>Start Time *</label>
                <input
                  type="time"
                  value={currentSlot.startTime}
                  onChange={(e) => setCurrentSlot({ ...currentSlot, startTime: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>End Time *</label>
                <input
                  type="time"
                  value={currentSlot.endTime}
                  onChange={(e) => setCurrentSlot({ ...currentSlot, endTime: e.target.value })}
                />
              </div>
              
              <button 
                type="button" 
                className="btn-add-slot"
                onClick={handleAddTimeSlot}
              >
                Add Slot
              </button>
            </div>

            {timeSlots.length > 0 && (
              <div className="time-slots-list">
                <h4>Added Time Slots ({timeSlots.length})</h4>
                {timeSlots.map((slot, index) => (
                  <div key={index} className="time-slot-item">
                    <span>{new Date(slot.date).toLocaleDateString()} - {slot.startTime} to {slot.endTime}</span>
                    <button
                      type="button"
                      className="btn-remove-slot"
                      onClick={() => handleRemoveTimeSlot(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className="btn-create"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Service'}
            </button>
            <button 
              type="button" 
              className="btn-cancel-modal"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
