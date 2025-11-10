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
            SlotId = appointment.SlotId
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
                SlotId = a.SlotId
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
                SlotId = a.SlotId
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
                SlotId = a.SlotId
            })
            .ToListAsync();
    }

    public async Task<AppointmentDto> CreateAsync(CreateAppointmentDto appointmentDto)
    {
        var appointment = new Appointment
        {
            Id = Guid.NewGuid(),
            UserId = appointmentDto.UserId,
            SpecialistId = appointmentDto.SpecialistId,
            ServiceId = appointmentDto.ServiceId,
            SlotId = appointmentDto.SlotId
        };

        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();

        return new AppointmentDto
        {
            Id = appointment.Id,
            UserId = appointment.UserId,
            SpecialistId = appointment.SpecialistId,
            ServiceId = appointment.ServiceId,
            SlotId = appointment.SlotId
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
            SlotId = appointment.SlotId
        };
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment is null)
        {
            return false;
        }

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> CancelAppointmentAsync(Guid id)
    {
        var appointment = await GetByIdAsync(id);
        if (appointment is null)
        {
            return false;
        }

        var slotReleased = await _slotService.ReleaseSlotAsync(appointment.SlotId);

        var entity = await _context.Appointments.FindAsync(id);
        _context.Appointments.Remove(entity!);
        await _context.SaveChangesAsync();
        return true;
    }
}