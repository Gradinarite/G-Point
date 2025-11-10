using GPoint.App.Interfaces;
using GPoint.DataAccess.Context;
using GPoint.DataAccess.Data.Entities;
using GPoint.Domain.DTOs;
using Microsoft.EntityFrameworkCore;

namespace GPoint.App.Services;

public class SlotService : ISlotService
{
    private readonly GPointDbContext _context;

    public SlotService(GPointDbContext context)
    {
        _context = context;
    }

    public async Task<SlotDto?> GetByIdAsync(Guid id)
    {
        var slot = await _context.Slots
            .Include(s => s.Service)
            .Include(s => s.Specialist)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (slot is null)
        {
            return null;
        }

        return new SlotDto
        {
            Id = slot.Id,
            ServiceId = slot.ServiceId,
            SpecialistId = slot.SpecialistId,
            StartTime = slot.StartTime,
            EndTime = slot.EndTime,
            IsBooked = slot.IsBooked
        };
    }

    public async Task<IEnumerable<SlotDto>> GetAllAsync()
    {
        return await _context.Slots
            .Select(s => new SlotDto
            {
                Id = s.Id,
                ServiceId = s.ServiceId,
                SpecialistId = s.SpecialistId,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                IsBooked = s.IsBooked
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<SlotDto>> GetBySpecialistIdAsync(Guid specialistId)
    {
        return await _context.Slots
            .Where(s => s.SpecialistId == specialistId)
            .OrderBy(s => s.StartTime)
            .Select(s => new SlotDto
            {
                Id = s.Id,
                ServiceId = s.ServiceId,
                SpecialistId = s.SpecialistId,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                IsBooked = s.IsBooked
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<SlotDto>> GetByServiceIdAsync(Guid serviceId)
    {
        return await _context.Slots
            .Where(s => s.ServiceId == serviceId)
            .OrderBy(s => s.StartTime)
            .Select(s => new SlotDto
            {
                Id = s.Id,
                ServiceId = s.ServiceId,
                SpecialistId = s.SpecialistId,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                IsBooked = s.IsBooked
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<SlotDto>> GetAvailableSlotsAsync(Guid specialistId, DateTime startDate, DateTime endDate)
    {
        return await _context.Slots
            .Where(s => s.SpecialistId == specialistId 
                        && !s.IsBooked
                        && s.StartTime >= startDate
                        && s.EndTime <= endDate)
            .OrderBy(s => s.StartTime)
            .Select(s => new SlotDto
            {
                Id = s.Id,
                ServiceId = s.ServiceId,
                SpecialistId = s.SpecialistId,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                IsBooked = s.IsBooked
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<SlotDto>> GetAvailableSlotsByServiceAsync(Guid serviceId, DateTime startDate, DateTime endDate)
    {
        return await _context.Slots
            .Where(s => s.ServiceId == serviceId 
                        && !s.IsBooked
                        && s.StartTime >= startDate
                        && s.EndTime <= endDate)
            .OrderBy(s => s.StartTime)
            .Select(s => new SlotDto
            {
                Id = s.Id,
                ServiceId = s.ServiceId,
                SpecialistId = s.SpecialistId,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                IsBooked = s.IsBooked
            })
            .ToListAsync();
    }

    public async Task<SlotDto> CreateAsync(CreateSlotDto slotDto)
    {
        var slot = new Slot
        {
            Id = Guid.NewGuid(),
            ServiceId = slotDto.ServiceId,
            SpecialistId = slotDto.SpecialistId,
            StartTime = slotDto.StartTime,
            EndTime = slotDto.EndTime,
            IsBooked = false
        };

        _context.Slots.Add(slot);
        await _context.SaveChangesAsync();

        return new SlotDto
        {
            Id = slot.Id,
            ServiceId = slot.ServiceId,
            SpecialistId = slot.SpecialistId,
            StartTime = slot.StartTime,
            EndTime = slot.EndTime,
            IsBooked = slot.IsBooked
        };
    }

    public async Task<SlotDto?> UpdateAsync(UpdateSlotDto slotDto)
    {
        var slot = await _context.Slots.FindAsync(slotDto.Id);
        if (slot is null)
        {
            return null;
        }

        slot.StartTime = slotDto.StartTime;
        slot.EndTime = slotDto.EndTime;
        slot.ServiceId = slotDto.ServiceId;
        slot.SpecialistId = slotDto.SpecialistId;

        await _context.SaveChangesAsync();

        return new SlotDto
        {
            Id = slot.Id,
            ServiceId = slot.ServiceId,
            SpecialistId = slot.SpecialistId,
            StartTime = slot.StartTime,
            EndTime = slot.EndTime,
            IsBooked = slot.IsBooked
        };
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var slot = await _context.Slots.FindAsync(id);
        if (slot is null)
        {
            return false;
        }

        _context.Slots.Remove(slot);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> BookSlotAsync(Guid slotId)
    {
        var slot = await _context.Slots.FindAsync(slotId);
        if (slot is null || slot.IsBooked)
        {
            return false;
        }

        slot.IsBooked = true;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ReleaseSlotAsync(Guid slotId)
    {
        var slot = await _context.Slots.FindAsync(slotId);
        if (slot is null)
        {
            return false;
        }

        slot.IsBooked = false;
        await _context.SaveChangesAsync();
        return true;
    }
}