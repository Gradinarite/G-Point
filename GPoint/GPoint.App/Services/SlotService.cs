using GPoint.App.Interfaces;
using GPoint.DataAccess.Data;
using GPoint.DataAccess.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace GPoint.App.Services;

public class SlotService : ISlotService
{
    private readonly GPointDbContext _context;

    public SlotService(GPointDbContext context)
    {
        _context = context;
    }

    public async Task<Slot?> GetByIdAsync(Guid id)
    {
        return await _context.Slots
            .Include(s => s.Service)
            .Include(s => s.Specialist)
            .Include(s => s.Appointment)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<IEnumerable<Slot>> GetAllAsync()
    {
        return await _context.Slots
            .Include(s => s.Service)
            .Include(s => s.Specialist)
            .ToListAsync();
    }

    public async Task<IEnumerable<Slot>> GetBySpecialistIdAsync(Guid specialistId)
    {
        return await _context.Slots
            .Where(s => s.SpecialistId == specialistId)
            .Include(s => s.Service)
            .Include(s => s.Specialist)
            .OrderBy(s => s.StartTime)
            .ToListAsync();
    }

    public async Task<IEnumerable<Slot>> GetByServiceIdAsync(Guid serviceId)
    {
        return await _context.Slots
            .Where(s => s.ServiceId == serviceId)
            .Include(s => s.Service)
            .Include(s => s.Specialist)
            .OrderBy(s => s.StartTime)
            .ToListAsync();
    }

    public async Task<IEnumerable<Slot>> GetAvailableSlotsAsync(Guid specialistId, DateTime startDate, DateTime endDate)
    {
        return await _context.Slots
            .Where(s => s.SpecialistId == specialistId 
                        && !s.IsBooked 
                        && s.StartTime >= startDate 
                        && s.EndTime <= endDate)
            .Include(s => s.Service)
            .Include(s => s.Specialist)
            .OrderBy(s => s.StartTime)
            .ToListAsync();
    }

    public async Task<IEnumerable<Slot>> GetAvailableSlotsByServiceAsync(Guid serviceId, DateTime startDate, DateTime endDate)
    {
        return await _context.Slots
            .Where(s => s.ServiceId == serviceId 
                        && !s.IsBooked 
                        && s.StartTime >= startDate 
                        && s.EndTime <= endDate)
            .Include(s => s.Service)
            .Include(s => s.Specialist)
            .OrderBy(s => s.StartTime)
            .ToListAsync();
    }

    public async Task<Slot> CreateAsync(Slot slot)
    {
        slot.Id = Guid.NewGuid();
        slot.IsBooked = false;
        _context.Slots.Add(slot);
        await _context.SaveChangesAsync();
        return slot;
    }

    public async Task<Slot> UpdateAsync(Slot slot)
    {
        _context.Slots.Update(slot);
        await _context.SaveChangesAsync();
        return slot;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var slot = await _context.Slots.FindAsync(id);
        if (slot == null)
            return false;

        _context.Slots.Remove(slot);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> BookSlotAsync(Guid slotId, Guid appointmentId)
    {
        var slot = await _context.Slots.FindAsync(slotId);
        if (slot == null || slot.IsBooked)
            return false;

        slot.IsBooked = true;
        slot.AppointmentId = appointmentId;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ReleaseSlotAsync(Guid slotId)
    {
        var slot = await _context.Slots.FindAsync(slotId);
        if (slot == null)
            return false;

        slot.IsBooked = false;
        slot.AppointmentId = null;
        await _context.SaveChangesAsync();
        return true;
    }
}

