import { useState, useEffect } from 'react';
import { updateService, deleteService } from '../../shared/api/service';
import { fetchSlotsByServiceId, createSlot, deleteSlot } from '../../shared/api/slot';
import type { Service, UpdateService } from '../../shared/types/service';
import type { Slot, CreateSlot } from '../../shared/types/slot';
import './CreateServiceModal.css';

interface EditServiceModalProps {
  service: Service;
  specialistId: string;
  onClose: () => void;
  onServiceUpdated: () => void;
}

interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
}

export default function EditServiceModal({ service, specialistId, onClose, onServiceUpdated }: EditServiceModalProps) {
  const [name, setName] = useState(service.name);
  const [description, setDescription] = useState(service.description || '');
  const [durationInMinutes, setDurationInMinutes] = useState(service.durationInMinutes);
  const [existingSlots, setExistingSlots] = useState<Slot[]>([]);
  const [newTimeSlots, setNewTimeSlots] = useState<TimeSlot[]>([]);
  const [currentSlot, setCurrentSlot] = useState<TimeSlot>({
    date: '',
    startTime: '',
    endTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    loadSlots();
  }, [service.serviceId]);

  const loadSlots = async () => {
    try {
      const slots = await fetchSlotsByServiceId(service.serviceId);
      setExistingSlots(slots);
    } catch (err) {
      console.error('Failed to load slots:', err);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleAddTimeSlot = () => {
    if (!currentSlot.date || !currentSlot.startTime || !currentSlot.endTime) {
      setError('Please fill in all time slot fields');
      return;
    }

    const start = new Date(`${currentSlot.date}T${currentSlot.startTime}`);
    const end = new Date(`${currentSlot.date}T${currentSlot.endTime}`);

    if (end <= start) {
      setError('End time must be after start time');
      return;
    }

    setNewTimeSlots([...newTimeSlots, currentSlot]);
    setCurrentSlot({ date: '', startTime: '', endTime: '' });
    setError('');
  };

  const handleRemoveNewTimeSlot = (index: number) => {
    setNewTimeSlots(newTimeSlots.filter((_, i) => i !== index));
  };

  const handleDeleteExistingSlot = async (slotId: string) => {
    try {
      await deleteSlot(slotId);
      setExistingSlots(existingSlots.filter(s => s.id !== slotId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to delete time slot.';
      setError(errorMessage);
      console.error('Delete slot error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Service name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const serviceData: UpdateService = {
        serviceId: service.serviceId,
        name: name.trim(),
        description: description.trim() || undefined,
        durationInMinutes,
        specialistId
      };

      await updateService(serviceData);

      // Create new time slots
      for (const slot of newTimeSlots) {
        const slotData: CreateSlot = {
          serviceId: service.serviceId,
          specialistId,
          startTime: `${slot.date}T${slot.startTime}:00`,
          endTime: `${slot.date}T${slot.endTime}:00`
        };
        await createSlot(slotData);
      }

      onServiceUpdated();
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to update service. Please try again.';
      setError(errorMessage);
      console.error('Update service error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async () => {
    setLoading(true);
    setError('');

    try {
      await deleteService(service.serviceId);
      onServiceUpdated();
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to delete service.';
      setError(errorMessage);
      console.error('Delete service error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Service</h2>
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
            <h3>Existing Time Slots</h3>
            {loadingSlots ? (
              <p>Loading slots...</p>
            ) : existingSlots.length === 0 ? (
              <p className="section-description">No time slots yet</p>
            ) : (
              <div className="time-slots-list">
                {existingSlots.map((slot) => (
                  <div key={slot.id} className="time-slot-item">
                    <span>
                      {new Date(slot.startTime).toLocaleDateString()} - {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {slot.isBooked && <span className="booked-badge"> (Booked)</span>}
                    </span>
                    {!slot.isBooked && (
                      <button
                        type="button"
                        className="btn-remove-slot"
                        onClick={() => handleDeleteExistingSlot(slot.id)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>Add New Time Slots</h3>
            <p className="section-description">Add more available time slots</p>
            
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

            {newTimeSlots.length > 0 && (
              <div className="time-slots-list">
                <h4>New Time Slots to Add ({newTimeSlots.length})</h4>
                {newTimeSlots.map((slot, index) => (
                  <div key={index} className="time-slot-item">
                    <span>{new Date(slot.date).toLocaleDateString()} - {slot.startTime} to {slot.endTime}</span>
                    <button
                      type="button"
                      className="btn-remove-slot"
                      onClick={() => handleRemoveNewTimeSlot(index)}
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
              {loading ? 'Updating...' : 'Update Service'}
            </button>
            <button 
              type="button" 
              className="btn-cancel-modal"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn-delete-service"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={loading}
            >
              Delete Service
            </button>
          </div>
        </form>

        {showDeleteConfirm && (
          <div className="confirm-overlay">
            <div className="confirm-dialog">
              <h3>Delete Service?</h3>
              <p>This will delete the service and all its time slots. Booked appointments will also be cancelled. This action cannot be undone.</p>
              <div className="confirm-buttons">
                <button 
                  className="btn-confirm-delete"
                  onClick={handleDeleteService}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button 
                  className="btn-confirm-cancel"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
