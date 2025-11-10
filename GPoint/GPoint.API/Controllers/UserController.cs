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

    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserDto createUserDto)
    {
        var createdUser = await UserService.CreateAsync(createUserDto);
        return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
    }
}