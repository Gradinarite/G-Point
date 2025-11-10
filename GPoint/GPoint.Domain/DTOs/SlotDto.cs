namespace GPoint.Domain.DTOs;

public class SlotDto
{
    public Guid Id { get; set; }
    public Guid ServiceId { get; set; }
    public Guid SpecialistId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsBooked { get; set; }
}

public class CreateSlotDto
{
    public Guid ServiceId { get; set; }
    public Guid SpecialistId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}

public class UpdateSlotDto
{
    public Guid Id { get; set; }
    public Guid ServiceId { get; set; }
    public Guid SpecialistId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}