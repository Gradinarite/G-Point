using GPoint.DataAccess.Data.Entities;

namespace GPoint.App.Interfaces;

public interface IServiceService
{
    Task<Service?> GetByIdAsync(Guid id);
    Task<IEnumerable<Service>> GetAllAsync();
    Task<IEnumerable<Service>> GetBySpecialistIdAsync(Guid specialistId);
    Task<Service> CreateAsync(Service service);
    Task<Service> UpdateAsync(Service service);
    Task<bool> DeleteAsync(Guid id);
}

