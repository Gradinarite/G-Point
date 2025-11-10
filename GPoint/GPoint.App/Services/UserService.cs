using GPoint.App.Interfaces;
using GPoint.DataAccess.Context;
using GPoint.DataAccess.Data;
using GPoint.DataAccess.Data.Entities;
using GPoint.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace GPoint.App.Services;

public class UserService : IUserService
{
    private readonly GPointDbContext _context;

    public UserService(GPointDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await _context.Users
            .Include(u => u.Services)
            .Include(u => u.Appointments)
            .Include(u => u.SpecialistAppointments)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users
            .Include(u => u.Services)
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users
            .Include(u => u.Services)
            .ToListAsync();
    }

    public async Task<IEnumerable<User>> GetSpecialistsAsync()
    {
        return await _context.Users
            .Where(u => u.Role == UserRole.Specialist)
            .Include(u => u.Services)
            .ToListAsync();
    }

    public async Task<User> CreateAsync(User user)
    {
        user.Id = Guid.NewGuid();
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _context.Users.AnyAsync(u => u.Email == email);
    }
}