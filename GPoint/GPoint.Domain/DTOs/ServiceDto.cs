namespace GPoint.Domain.DTOs;

public class ServiceDto
{
    public Guid ServiceId { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int DurationInMinutes { get; set; }
    public Guid SpecialistId { get; set; }
}

public class CreateServiceDto
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int DurationInMinutes { get; set; }
    public Guid SpecialistId { get; set; }
}

public class UpdateServiceDto
{
    public Guid ServiceId { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int DurationInMinutes { get; set; }
    public Guid SpecialistId { get; set; }
}