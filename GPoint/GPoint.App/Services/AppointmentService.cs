using GPoint.App.Interfaces;
using GPoint.DataAccess.Context;
using GPoint.DataAccess.Data.Entities;
using GPoint.Domain.DTOs;
using Microsoft.EntityFrameworkCore;

namespace GPoint.App.Services;

public class AppointmentService : IAppointmentService
{
    private readonly GPointDbContext _context;
    private readonly ISlotService _slotService;

    public AppointmentService(GPointDbContext context, ISlotService slotService)
    {
        _context = context;
        _slotService = slotService;
    }

    public async Task<AppointmentDto?> GetByIdAsync(Guid id)
    {
        var appointment = await _context.Appointments
            .Include(a => a.User)
            .Include(a => a.Specialist)
            .Include(a => a.Slot)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (appointment is null)
        {
            return null;
        }

        return new AppointmentDto
        {
            Id = appointment.Id,
            UserId = appointment.UserId,
            SpecialistId = appointment.SpecialistId,
            ServiceId = appointment.ServiceId,
            SlotId = appointment.SlotId,
            Status = appointment.Status
        };
    }

    public async Task<IEnumerable<AppointmentDto>> GetAllAsync()
    {
        return await _context.Appointments
            .Select(a => new AppointmentDto
            {
                Id = a.Id,
                UserId = a.UserId,
                SpecialistId = a.SpecialistId,
                ServiceId = a.ServiceId,
                SlotId = a.SlotId,
                Status = a.Status
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<AppointmentDto>> GetByUserIdAsync(Guid userId)
    {
        return await _context.Appointments
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.Slot!.StartTime)
            .Select(a => new AppointmentDto
            {
                Id = a.Id,
                UserId = a.UserId,
                SpecialistId = a.SpecialistId,
                ServiceId = a.ServiceId,
                SlotId = a.SlotId,
                Status = a.Status
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<AppointmentDto>> GetBySpecialistIdAsync(Guid specialistId)
    {
        return await _context.Appointments
            .Where(a => a.SpecialistId == specialistId)
            .OrderByDescending(a => a.Slot!.StartTime)
            .Select(a => new AppointmentDto
            {
                Id = a.Id,
                UserId = a.UserId,
                SpecialistId = a.SpecialistId,
                ServiceId = a.ServiceId,
                SlotId = a.SlotId,
                Status = a.Status
            })
            .ToListAsync();
    }

    public async Task<AppointmentDto> CreateAsync(CreateAppointmentDto appointmentDto)
    {
        // Check if the slot is already booked - reload from database to avoid cached data
        var slot = await _context.Slots
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == appointmentDto.SlotId);
            
        if (slot == null)
        {
            throw new InvalidOperationException("Slot not found");
        }
        
        if (slot.IsBooked)
        {
            throw new InvalidOperationException("This time slot is already booked");
        }

        // Now get the tracked entity to update it
        var slotToUpdate = await _context.Slots.FindAsync(appointmentDto.SlotId);
        if (slotToUpdate == null)
        {
            throw new InvalidOperationException("Slot not found");
        }

        var appointment = new Appointment
        {
            Id = Guid.NewGuid(),
            UserId = appointmentDto.UserId,
            SpecialistId = appointmentDto.SpecialistId,
            ServiceId = appointmentDto.ServiceId,
            SlotId = appointmentDto.SlotId
        };

        // Mark the slot as booked
        slotToUpdate.IsBooked = true;

        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();

        return new AppointmentDto
        {
            Id = appointment.Id,
            UserId = appointment.UserId,
            SpecialistId = appointment.SpecialistId,
            ServiceId = appointment.ServiceId,
            SlotId = appointment.SlotId,
            Status = appointment.Status
        };
    }

    public async Task<AppointmentDto?> UpdateAsync(UpdateAppointmentDto appointmentDto)
    {
        var appointment = await _context.Appointments.FindAsync(appointmentDto.Id);
        if (appointment is null)
        {
            return null;
        }

        appointment.UserId = appointmentDto.UserId;
        appointment.SpecialistId = appointmentDto.SpecialistId;
        appointment.ServiceId = appointmentDto.ServiceId;
        appointment.SlotId = appointmentDto.SlotId;

        await _context.SaveChangesAsync();

        return new AppointmentDto
        {
            Id = appointment.Id,
            UserId = appointment.UserId,
            SpecialistId = appointment.SpecialistId,
            ServiceId = appointment.ServiceId,
            SlotId = appointment.SlotId,
            Status = appointment.Status
        };
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment is null)
        {
            return false;
        }

        // Free up the slot when deleting the appointment
        var slot = await _context.Slots.FindAsync(appointment.SlotId);
        if (slot != null)
        {
            slot.IsBooked = false;
        }

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> CancelAppointmentAsync(Guid id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment is null)
        {
            return false;
        }

        // Release the slot so it can be booked again
        await _slotService.ReleaseSlotAsync(appointment.SlotId);

        // Set status to cancelled instead of deleting
        appointment.Status = 3; // 3 = Cancelled
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> CompleteAppointmentAsync(Guid id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment is null)
        {
            return false;
        }

        // Get the slot and release it
        var slot = await _context.Slots.FindAsync(appointment.SlotId);
        if (slot != null)
        {
            slot.IsBooked = false;
            _context.Entry(slot).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }

        appointment.Status = 2; // 2 = Completed
        await _context.SaveChangesAsync();
        return true;
    }
}