using GPoint.DataAccess.Data.Entities;

namespace GPoint.App.Interfaces;

public interface IAppointmentService
{
    Task<Appointment?> GetByIdAsync(Guid id);
    Task<IEnumerable<Appointment>> GetAllAsync();
    Task<IEnumerable<Appointment>> GetByUserIdAsync(Guid userId);
    Task<IEnumerable<Appointment>> GetBySpecialistIdAsync(Guid specialistId);
    Task<Appointment> CreateAsync(Appointment appointment);
    Task<Appointment> UpdateAsync(Appointment appointment);
    Task<bool> DeleteAsync(Guid id);
    Task<bool> CancelAppointmentAsync(Guid id);
}