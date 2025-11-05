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
  [ForeignKey("SpecialistId")]
  [InverseProperty("SpecialistAppointments")]
  public User Specialist { get; set; } = null!;

  // Inverse navigation - a single Slot may reference this Appointment via Slot.AppointmentId
  [InverseProperty("Appointment")]
  public Slot? Slot { get; set; }
}