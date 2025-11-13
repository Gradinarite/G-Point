namespace GPoint.Domain.DTOs;

public class AppointmentDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid SpecialistId { get; set; }
    public Guid ServiceId { get; set; }
    public Guid SlotId { get; set; }
    public int Status { get; set; } = 1; // 1 = Scheduled, 2 = Completed, 3 = Cancelled
}

public class CreateAppointmentDto
{
    public Guid UserId { get; set; }
    public Guid SpecialistId { get; set; }
    public Guid ServiceId { get; set; }
    public Guid SlotId { get; set; }
}

public class UpdateAppointmentDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid SpecialistId { get; set; }
    public Guid ServiceId { get; set; }
    public Guid SlotId { get; set; }
}
