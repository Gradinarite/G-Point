using GPoint.DataAccess.Data.Entities;

namespace GPoint.App.Interfaces;

public interface ISlotService
{
    Task<Slot?> GetByIdAsync(Guid id);
    Task<IEnumerable<Slot>> GetAllAsync();
    Task<IEnumerable<Slot>> GetBySpecialistIdAsync(Guid specialistId);
    Task<IEnumerable<Slot>> GetByServiceIdAsync(Guid serviceId);
    Task<IEnumerable<Slot>> GetAvailableSlotsAsync(Guid specialistId, DateTime startDate, DateTime endDate);
    Task<IEnumerable<Slot>> GetAvailableSlotsByServiceAsync(Guid serviceId, DateTime startDate, DateTime endDate);
    Task<Slot> CreateAsync(Slot slot);
    Task<Slot> UpdateAsync(Slot slot);
    Task<bool> DeleteAsync(Guid id);
    Task<bool> BookSlotAsync(Guid slotId, Guid appointmentId);
    Task<bool> ReleaseSlotAsync(Guid slotId);
}

