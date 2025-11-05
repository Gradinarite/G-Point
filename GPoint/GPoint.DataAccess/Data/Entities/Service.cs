using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GPoint.DataAccess.Data.Entities;

public class Service
{
    [Key]
    public Guid ServiceId { get; set; }
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;
    [MaxLength(500)]
    public string? Description { get; set; }
    [Required]
    public int DurationInMinutes { get; set; }
    
    // The specialist (User) who provides this service
    [Required]
    public Guid SpecialistId { get; set; }

    [ForeignKey("SpecialistId")]
    public User Specialist { get; set; } = null!;

    // One Service has many Slots
    public ICollection<Slot>? Slots { get; set; } = new List<Slot>();
}