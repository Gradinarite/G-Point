using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GPoint.DataAccess.Data.Entities;

public class Slot
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    public Guid SpecialistId { get; set; }
    
    [Required]
    public Guid ServiceId { get; set; }
    
    [Required]
    public DateTime StartTime { get; set; }
    
    [Required]
    public DateTime EndTime { get; set; }
    
    [Required]
    public bool IsBooked { get; set; }
    
    [Required]
    [ForeignKey("ServiceId")]
    [InverseProperty("Slots")]
    public Service Service { get; set; } = null!;

    [ForeignKey("SpecialistId")]
    [InverseProperty("Slots")]
    public User Specialist { get; set; } = null!;
}