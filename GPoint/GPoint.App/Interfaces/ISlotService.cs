using GPoint.DataAccess.Data.Entities;
using GPoint.Domain.DTOs;

namespace GPoint.App.Interfaces;

public interface ISlotService
{
    Task<SlotDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<SlotDto>> GetAllAsync();
    Task<IEnumerable<SlotDto>> GetBySpecialistIdAsync(Guid specialistId);
    Task<IEnumerable<SlotDto>> GetByServiceIdAsync(Guid serviceId);
    Task<IEnumerable<SlotDto>> GetAvailableSlotsAsync(Guid specialistId, DateTime startDate, DateTime endDate);
    Task<IEnumerable<SlotDto>> GetAvailableSlotsByServiceAsync(Guid serviceId, DateTime startDate, DateTime endDate);
    Task<SlotDto> CreateAsync(CreateSlotDto slotDto);
    Task<SlotDto?> UpdateAsync(UpdateSlotDto slotDto);
    Task<bool> DeleteAsync(Guid id);
    Task<bool> BookSlotAsync(Guid slotId);
    Task<bool> ReleaseSlotAsync(Guid slotId);
}