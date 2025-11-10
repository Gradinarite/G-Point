using GPoint.App.Interfaces;
using GPoint.DataAccess.Context;
using GPoint.DataAccess.Data;
using GPoint.DataAccess.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace GPoint.App.Services;

public class ServiceService : IServiceService
{
    private readonly GPointDbContext _context;

    public ServiceService(GPointDbContext context)
    {
        _context = context;
    }

    public async Task<Service?> GetByIdAsync(Guid id)
    {
        return await _context.Services
            .Include(s => s.Specialist)
            .Include(s => s.Slots)
            .FirstOrDefaultAsync(s => s.ServiceId == id);
    }

    public async Task<IEnumerable<Service>> GetAllAsync()
    {
        return await _context.Services
            .Include(s => s.Specialist)
            .Include(s => s.Slots)
            .ToListAsync();
    }

    public async Task<IEnumerable<Service>> GetBySpecialistIdAsync(Guid specialistId)
    {
        return await _context.Services
            .Where(s => s.SpecialistId == specialistId)
            .Include(s => s.Specialist)
            .Include(s => s.Slots)
            .ToListAsync();
    }

    public async Task<Service> CreateAsync(Service service)
    {
        service.ServiceId = Guid.NewGuid();
        _context.Services.Add(service);
        await _context.SaveChangesAsync();
        return service;
    }

    public async Task<Service> UpdateAsync(Service service)
    {
        _context.Services.Update(service);
        await _context.SaveChangesAsync();
        return service;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var service = await _context.Services.FindAsync(id);
        if (service == null)
            return false;

        _context.Services.Remove(service);
        await _context.SaveChangesAsync();
        return true;
    }
}

