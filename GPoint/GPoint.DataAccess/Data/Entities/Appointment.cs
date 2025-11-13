using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GPoint.DataAccess.Data.Entities;

public class Appointment
{
    [Key]
    public Guid Id { get; set; }

    // The client who booked the appointment
    [Required]
    public Guid UserId { get; set; }
  
    [ForeignKey("UserId")]
    [InverseProperty("Appointments")]
    public User User { get; set; } = null!;

    // The specialist who will take the appointment
    [Required]
    public Guid SpecialistId { get; set; }
    [Required]
    public Guid SlotId { get; set; }
    [Required] 
    public Guid ServiceId { get; set; }

    // Status: 1 = Scheduled, 2 = Completed, 3 = Cancelled
    public int Status { get; set; } = 1;

    [ForeignKey("SpecialistId")]
    [InverseProperty("SpecialistAppointments")]
    public User Specialist { get; set; } = null!;
    
    [ForeignKey("SlotId")]
    public Slot Slot { get; set; } = null!;
    
    [ForeignKey("ServiceId")]
    public Service Service { get; set; } = null!;
}