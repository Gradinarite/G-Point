export interface Appointment {
  id: string;
  userId: string;
  specialistId: string;
  serviceId: string;
  slotId: string;
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
