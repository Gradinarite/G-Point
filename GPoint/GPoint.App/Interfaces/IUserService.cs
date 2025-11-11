using GPoint.DataAccess.Data.Entities;
using GPoint.Domain.DTOs;

namespace GPoint.App.Interfaces;

public interface IUserService
{
    Task<UserDto?> GetByIdAsync(Guid id);
    Task<UserDto?> GetByEmailAsync(string email);
    Task<IEnumerable<UserDto>> GetAllAsync();
    Task<IEnumerable<UserDto>> GetSpecialistsAsync();
    Task<UserDto> CreateAsync(CreateUserDto userDto);
    Task<UserDto?> UpdateAsync(Guid id, UpdateUserDto userDto);
    Task<bool> DeleteAsync(Guid id);
    Task<bool> EmailExistsAsync(string email);
}