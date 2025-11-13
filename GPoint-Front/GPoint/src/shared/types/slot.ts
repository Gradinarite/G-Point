export interface Slot {
  id: string;
  serviceId: string;
  specialistId: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface CreateSlot {
  serviceId: string;
  specialistId: string;
  startTime: string;
  endTime: string;
}

export interface UpdateSlot {
  id: string;
  serviceId: string;
  specialistId: string;
  startTime: string;
  endTime: string;
}
