using GPoint.App.Interfaces;
using GPoint.DataAccess.Context;
using GPoint.DataAccess.Data;
using GPoint.DataAccess.Data.Entities;
using GPoint.Domain.DTOs;
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

    public async Task<UserDto?> GetByIdAsync(Guid id)
    {
        var user = await _context.Users
            .Include(u => u.Services)
            .Include(u => u.Appointments)
            .Include(u => u.SpecialistAppointments)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user is null)
        {
            return null;
        }

        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role
        };
    }
    public async Task<UserDto?> GetByEmailAsync(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        
        if (user is null)
        {
            return null;
        }

        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role
        };
    }

    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        return await _context.Users.Select(u => new UserDto
            {
                Id = u.Id,
                FullName = u.FullName,
                Email = u.Email,
                Role = u.Role
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<UserDto>> GetSpecialistsAsync()
    {
        return await _context.Users
            .Where(u => u.Role == UserRole.Specialist)
            .Include(u => u.Services)
            .Select(u => new UserDto
            {
                Id = u.Id,
                Email = u.Email,
                FullName = u.FullName,
                Role = u.Role
            })
            .ToListAsync();
    }

    public async Task<UserDto> CreateAsync(CreateUserDto userDto)
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            FullName = userDto.FullName,
            Email = userDto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
            Role = userDto.Role
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new UserDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role
        };
    }

    public async Task<UserDto?> UpdateAsync(Guid id, UpdateUserDto updatedUserDto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user is null)
        {
            return null;
        }

        user.FullName = updatedUserDto.FullName;
        user.Email = updatedUserDto.Email;
        user.Role = updatedUserDto.Role;
        if (!string.IsNullOrEmpty(updatedUserDto.Password))
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updatedUserDto.Password);
        }

        await _context.SaveChangesAsync();

        return new UserDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role
        };
    }


    public async Task<bool> DeleteAsync(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user is null)
        {
            return false;
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _context.Users.AnyAsync(u => u.Email == email);
    }

    public async Task<UserDto?> ValidateCredentialsAsync(string email, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        
        if (user == null)
        {
            return null;
        }

        // Verify password using BCrypt
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        
        if (!isPasswordValid)
        {
            return null;
        }

        return new UserDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role
        };
    }
}