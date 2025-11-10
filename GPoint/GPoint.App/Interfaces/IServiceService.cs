using GPoint.DataAccess.Data.Entities;
using GPoint.Domain.DTOs;

namespace GPoint.App.Interfaces;

public interface IServiceService
{
    Task<ServiceDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<ServiceDto>> GetAllAsync();
    Task<IEnumerable<ServiceDto>> GetBySpecialistIdAsync(Guid specialistId);
    Task<ServiceDto> CreateAsync(CreateServiceDto serviceDto);
    Task<ServiceDto?> UpdateAsync(UpdateServiceDto serviceDto);
    Task<bool> DeleteAsync(Guid id);
}