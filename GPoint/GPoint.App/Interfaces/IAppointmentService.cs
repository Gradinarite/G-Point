using GPoint.DataAccess.Data.Entities;
using GPoint.Domain.DTOs;

namespace GPoint.App.Interfaces;

public interface IAppointmentService
{
    Task<AppointmentDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<AppointmentDto>> GetAllAsync();
    Task<IEnumerable<AppointmentDto>> GetByUserIdAsync(Guid userId);
    Task<IEnumerable<AppointmentDto>> GetBySpecialistIdAsync(Guid specialistId);
    Task<AppointmentDto> CreateAsync(CreateAppointmentDto appointmentDto);
    Task<AppointmentDto?> UpdateAsync(UpdateAppointmentDto appointmentDto);
    Task<bool> DeleteAsync(Guid id);
    Task<bool> CancelAppointmentAsync(Guid id);
    Task<bool> CompleteAppointmentAsync(Guid id);
}