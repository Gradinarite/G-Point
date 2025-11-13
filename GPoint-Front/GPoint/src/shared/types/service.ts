export interface Service {
  serviceId: string;
  name: string;
  description?: string;
  durationInMinutes: number;
  specialistId: string;
}

export interface CreateService {
  name: string;
  description?: string;
  durationInMinutes: number;
  specialistId: string;
}

export interface UpdateService {
  serviceId: string;
  name: string;
  description?: string;
  durationInMinutes: number;
  specialistId: string;
}
