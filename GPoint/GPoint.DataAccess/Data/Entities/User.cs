using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GPoint.Domain.Enums;

namespace GPoint.DataAccess.Data.Entities;

public class User
{ 
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string FullName { get; set; } = null!;
    
    [Required]
    [MaxLength(100)]
    public string Email { get; set; } = null!;
    
    [Required]
    [MaxLength(255)]
    public string PasswordHash { get; set; } = null!;
    
    [Required]
    public UserRole Role { get; set; }

    // A specialist (User) can provide many services
    [InverseProperty("Specialist")]
    public ICollection<Service>? Services { get; set; } = new List<Service>();

    // A user can have many appointments (as a client)
    [InverseProperty("User")]
    public ICollection<Appointment>? Appointments { get; set; } = new List<Appointment>();

    // Appointments where the user is the specialist
    [InverseProperty("Specialist")]
    public ICollection<Appointment>? SpecialistAppointments { get; set; } = new List<Appointment>();

    // Slots that the specialist offers
    [InverseProperty("Specialist")]
    public ICollection<Slot>? Slots { get; set; } = new List<Slot>();
}