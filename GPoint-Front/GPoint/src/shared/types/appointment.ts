export interface Appointment {
  id: string;
  userId: string;
  specialistId: string;
  serviceId: string;
  slotId: string;
  status: number; // 1 = Scheduled, 2 = Completed, 3 = Cancelled
}

export interface CreateAppointment {
  userId: string;
  specialistId: string;
  serviceId: string;
  slotId: string;
}

export interface UpdateAppointment {
  id: string;
  userId: string;
  specialistId: string;
  serviceId: string;
  slotId: string;
}
