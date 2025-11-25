using GPoint.App.Interfaces;
using GPoint.Domain.DTOs;
using GPoint.App.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace GPoint.API.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class UserController : ControllerBase
{
    public IUserService UserService { get; set;  }
    
    public UserController(IUserService userService)
    {
        UserService = userService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        var user = await UserService.GetByIdAsync(id);
        if (user is null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpGet]
    public async Task<IActionResult> GetUserByEmail(string email)
    {
        var user = await UserService.GetByEmailAsync(email);
        if (user is null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await UserService.GetAllAsync();
        return Ok(users); 
    }

    [HttpGet]
    public async Task<IActionResult> GetSpecialists()
    {
        var specialists = await UserService.GetSpecialistsAsync();
        return Ok(specialists);
    }

    [HttpPost]
    public async Task<IActionResult> ValidateCredentials([FromBody] LoginDto loginDto)
    {
        var user = await UserService.ValidateCredentialsAsync(loginDto.Email, loginDto.Password);
        if (user is null)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }
        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserDto createUserDto)
    {
        var createdUser = await UserService.CreateAsync(createUserDto);
        return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, UpdateUserDto updatedUserDto)
    {
        var result = await UserService.UpdateAsync(id, updatedUserDto);
        if (result is null)
        {
            return NotFound();
        }
        
        return Ok(result);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteUserById(Guid id)
    {
        await UserService.DeleteAsync(id);
        return NoContent();
    }
}