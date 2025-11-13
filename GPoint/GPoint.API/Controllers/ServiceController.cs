using GPoint.App.Interfaces;
using GPoint.Domain.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace GPoint.API.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class ServiceController : ControllerBase
{
    public IServiceService ServiceService { get; set; }
    
    public ServiceController(IServiceService serviceService)
    {
        ServiceService = serviceService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetServiceById(Guid id)
    {
        var service = await ServiceService.GetByIdAsync(id);
        if (service is null)
        {
            return NotFound();
        }
        return Ok(service);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllServices()
    {
        var services = await ServiceService.GetAllAsync();
        return Ok(services);
    }

    [HttpGet("{specialistId}")]
    public async Task<IActionResult> GetServicesBySpecialistId(Guid specialistId)
    {
        var services = await ServiceService.GetBySpecialistIdAsync(specialistId);
        return Ok(services);
    }

    [HttpPost]
    public async Task<IActionResult> CreateService(CreateServiceDto createServiceDto)
    {
        var createdService = await ServiceService.CreateAsync(createServiceDto);
        return CreatedAtAction(nameof(GetServiceById), new { id = createdService.ServiceId }, createdService);
    }

    [HttpPatch]
    public async Task<IActionResult> UpdateService(UpdateServiceDto updateServiceDto)
    {
        var result = await ServiceService.UpdateAsync(updateServiceDto);
        if (result is null)
        {
            return NotFound();
        }
        
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteService(Guid id)
    {
        var result = await ServiceService.DeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}
