using GPoint.App.Interfaces;
using GPoint.Domain.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace GPoint.API.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class SlotController : ControllerBase
{
    public ISlotService SlotService { get; set; }
    
    public SlotController(ISlotService slotService)
    {
        SlotService = slotService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSlotById(Guid id)
    {
        var slot = await SlotService.GetByIdAsync(id);
        if (slot is null)
        {
            return NotFound();
        }
        return Ok(slot);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSlots()
    {
        var slots = await SlotService.GetAllAsync();
        return Ok(slots);
    }

    [HttpGet("{specialistId}")]
    public async Task<IActionResult> GetSlotsBySpecialistId(Guid specialistId)
    {
        var slots = await SlotService.GetBySpecialistIdAsync(specialistId);
        return Ok(slots);
    }

    [HttpGet("{serviceId}")]
    public async Task<IActionResult> GetSlotsByServiceId(Guid serviceId)
    {
        var slots = await SlotService.GetByServiceIdAsync(serviceId);
        return Ok(slots);
    }

    [HttpGet]
    public async Task<IActionResult> GetAvailableSlots(Guid specialistId, DateTime startDate, DateTime endDate)
    {
        var slots = await SlotService.GetAvailableSlotsAsync(specialistId, startDate, endDate);
        return Ok(slots);
    }

    [HttpGet]
    public async Task<IActionResult> GetAvailableSlotsByService(Guid serviceId, DateTime startDate, DateTime endDate)
    {
        var slots = await SlotService.GetAvailableSlotsByServiceAsync(serviceId, startDate, endDate);
        return Ok(slots);
    }

    [HttpPost]
    public async Task<IActionResult> CreateSlot(CreateSlotDto createSlotDto)
    {
        var createdSlot = await SlotService.CreateAsync(createSlotDto);
        return CreatedAtAction(nameof(GetSlotById), new { id = createdSlot.Id }, createdSlot);
    }

    [HttpPatch]
    public async Task<IActionResult> UpdateSlot(UpdateSlotDto updateSlotDto)
    {
        var result = await SlotService.UpdateAsync(updateSlotDto);
        if (result is null)
        {
            return NotFound();
        }
        
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSlot(Guid id)
    {
        var result = await SlotService.DeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpPatch("{slotId}")]
    public async Task<IActionResult> BookSlot(Guid slotId)
    {
        var result = await SlotService.BookSlotAsync(slotId);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpPatch("{slotId}")]
    public async Task<IActionResult> ReleaseSlot(Guid slotId)
    {
        var result = await SlotService.ReleaseSlotAsync(slotId);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}
