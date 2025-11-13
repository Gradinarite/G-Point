using GPoint.App.Interfaces;
using GPoint.Domain.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace GPoint.API.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AppointmentController : ControllerBase
{
    public IAppointmentService AppointmentService { get; set; }
    
    public AppointmentController(IAppointmentService appointmentService)
    {
        AppointmentService = appointmentService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAppointmentById(Guid id)
    {
        var appointment = await AppointmentService.GetByIdAsync(id);
        if (appointment is null)
        {
            return NotFound();
        }
        return Ok(appointment);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAppointments()
    {
        var appointments = await AppointmentService.GetAllAsync();
        return Ok(appointments);
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetAppointmentsByUserId(Guid userId)
    {
        var appointments = await AppointmentService.GetByUserIdAsync(userId);
        return Ok(appointments);
    }

    [HttpGet("{specialistId}")]
    public async Task<IActionResult> GetAppointmentsBySpecialistId(Guid specialistId)
    {
        var appointments = await AppointmentService.GetBySpecialistIdAsync(specialistId);
        return Ok(appointments);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAppointment(CreateAppointmentDto createAppointmentDto)
    {
        var createdAppointment = await AppointmentService.CreateAsync(createAppointmentDto);
        return CreatedAtAction(nameof(GetAppointmentById), new { id = createdAppointment.Id }, createdAppointment);
    }

    [HttpPatch]
    public async Task<IActionResult> UpdateAppointment(UpdateAppointmentDto updateAppointmentDto)
    {
        var result = await AppointmentService.UpdateAsync(updateAppointmentDto);
        if (result is null)
        {
            return NotFound();
        }
        
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAppointment(Guid id)
    {
        var result = await AppointmentService.DeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> CancelAppointment(Guid id)
    {
        var result = await AppointmentService.CancelAppointmentAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> CompleteAppointment(Guid id)
    {
        var result = await AppointmentService.CompleteAppointmentAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}
