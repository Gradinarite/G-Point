using GPoint.App.Interfaces;
using GPoint.DataAccess.Context;
using GPoint.DataAccess.Data.Entities;
using GPoint.Domain.DTOs;
using Microsoft.EntityFrameworkCore;

namespace GPoint.App.Services;

public class ServiceService : IServiceService
{
    private readonly GPointDbContext _context;

    public ServiceService(GPointDbContext context)
    {
        _context = context;
    }

    public async Task<ServiceDto?> GetByIdAsync(Guid id)
    {
        var service = await _context.Services
            .Include(s => s.Specialist)
            .Include(s => s.Slots)
            .FirstOrDefaultAsync(s => s.ServiceId == id);

        if (service is null)
        {
            return null;
        }

        return new ServiceDto
        {
            ServiceId = service.ServiceId,
            Name = service.Name,
            Description = service.Description,
            DurationInMinutes = service.DurationInMinutes,
            SpecialistId = service.SpecialistId
        };
    }

    public async Task<IEnumerable<ServiceDto>> GetAllAsync()
    {
        return await _context.Services
            .Select(s => new ServiceDto
            {
                ServiceId = s.ServiceId,
                Name = s.Name,
                Description = s.Description,
                DurationInMinutes = s.DurationInMinutes,
                SpecialistId = s.SpecialistId
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<ServiceDto>> GetBySpecialistIdAsync(Guid specialistId)
    {
        return await _context.Services
            .Where(s => s.SpecialistId == specialistId)
            .Select(s => new ServiceDto
            {
                ServiceId = s.ServiceId,
                Name = s.Name,
                Description = s.Description,
                DurationInMinutes = s.DurationInMinutes,
                SpecialistId = s.SpecialistId
            })
            .ToListAsync();
    }

    public async Task<ServiceDto> CreateAsync(CreateServiceDto serviceDto)
    {
        var service = new Service
        {
            ServiceId = Guid.NewGuid(),
            Name = serviceDto.Name,
            Description = serviceDto.Description,
            DurationInMinutes = serviceDto.DurationInMinutes,
            SpecialistId = serviceDto.SpecialistId
        };

        _context.Services.Add(service);
        await _context.SaveChangesAsync();

        return new ServiceDto
        {
            ServiceId = service.ServiceId,
            Name = service.Name,
            Description = service.Description,
            DurationInMinutes = service.DurationInMinutes,
            SpecialistId = service.SpecialistId
        };
    }

    public async Task<ServiceDto?> UpdateAsync(UpdateServiceDto serviceDto)
    {
        var service = await _context.Services.FindAsync(serviceDto.ServiceId);
        if (service is null)
        {
            return null;
        }

        service.Name = serviceDto.Name;
        service.Description = serviceDto.Description;
        service.DurationInMinutes = serviceDto.DurationInMinutes;
        service.SpecialistId = serviceDto.SpecialistId;

        await _context.SaveChangesAsync();

        return new ServiceDto
        {
            ServiceId = service.ServiceId,
            Name = service.Name,
            Description = service.Description,
            DurationInMinutes = service.DurationInMinutes,
            SpecialistId = service.SpecialistId
        };
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var service = await _context.Services.FindAsync(id);
        if (service is null)
        {
            return false;
        }

        _context.Services.Remove(service);
        await _context.SaveChangesAsync();
        return true;
    }
}