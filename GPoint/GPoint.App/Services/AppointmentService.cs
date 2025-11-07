using GPoint.App.Interfaces;
using GPoint.DataAccess.Data;
using GPoint.DataAccess.Data.Entities;
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

    public async Task<Appointment?> GetByIdAsync(Guid id)
    {
        return await _context.Appointments
            .Include(a => a.User)
            .Include(a => a.Specialist)
            .Include(a => a.Slot)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<IEnumerable<Appointment>> GetAllAsync()
    {
        return await _context.Appointments
            .Include(a => a.User)
            .Include(a => a.Specialist)
            .Include(a => a.Slot)
            .ToListAsync();
    }

    public async Task<IEnumerable<Appointment>> GetByUserIdAsync(Guid userId)
    {
        return await _context.Appointments
            .Where(a => a.UserId == userId)
            .Include(a => a.User)
            .Include(a => a.Specialist)
            .Include(a => a.Slot)
            .OrderByDescending(a => a.Slot!.StartTime)
            .ToListAsync();
    }

    public async Task<IEnumerable<Appointment>> GetBySpecialistIdAsync(Guid specialistId)
    {
        return await _context.Appointments
            .Where(a => a.SpecialistId == specialistId)
            .Include(a => a.User)
            .Include(a => a.Specialist)
            .Include(a => a.Slot)
            .OrderByDescending(a => a.Slot!.StartTime)
            .ToListAsync();
    }

    public async Task<Appointment> CreateAsync(Appointment appointment)
    {
        appointment.Id = Guid.NewGuid();
        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();
        return appointment;
    }

    public async Task<Appointment> UpdateAsync(Appointment appointment)
    {
        _context.Appointments.Update(appointment);
        await _context.SaveChangesAsync();
        return appointment;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null)
            return false;

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> CancelAppointmentAsync(Guid id)
    {
        var appointment = await GetByIdAsync(id);
        if (appointment == null)
            return false;

        // Release the slot if one was booked
        if (appointment.Slot != null)
        {
            await _slotService.ReleaseSlotAsync(appointment.Slot.Id);
        }

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();
        return true;
    }
}