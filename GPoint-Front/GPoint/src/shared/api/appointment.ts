import type { Appointment, CreateAppointment, UpdateAppointment } from "../types/appointment";
import { getContextualErrorMessage } from "../utils/errorHandler";

const API_BASE_URL = "http://localhost:5141/api/Appointment";

export async function fetchAppointment(id: string): Promise<Appointment> {
    const response = await fetch(`${API_BASE_URL}/GetAppointmentById/${id}`);

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Appointment' }));
    }

    const appointmentData = await response.json();
    return appointmentData;
}

export async function fetchAllAppointments(): Promise<Appointment[]> {
    const response = await fetch(`${API_BASE_URL}/GetAllAppointments`);

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Appointments' }));
    }

    const appointments = await response.json();
    return appointments;
}

export async function fetchAppointmentsByUserId(userId: string): Promise<Appointment[]> {
    const response = await fetch(`${API_BASE_URL}/GetAppointmentsByUserId/${userId}`);

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Appointments' }));
    }

    const appointments = await response.json();
    return appointments;
}

export async function fetchAppointmentsBySpecialistId(specialistId: string): Promise<Appointment[]> {
    const response = await fetch(`${API_BASE_URL}/GetAppointmentsBySpecialistId/${specialistId}`);

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Appointments' }));
    }

    const appointments = await response.json();
    return appointments;
}

export async function createAppointment(appointmentData: CreateAppointment): Promise<Appointment> {
    const response = await fetch(`${API_BASE_URL}/CreateAppointment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'book', resource: 'Appointment' }));
    }

    const createdAppointment = await response.json();
    return createdAppointment;
}

export async function updateAppointment(appointmentData: UpdateAppointment): Promise<Appointment> {
    const response = await fetch(`${API_BASE_URL}/UpdateAppointment`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'update', resource: 'Appointment' }));
    }

    const updatedAppointment = await response.json();
    return updatedAppointment;
}

export async function deleteAppointment(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/DeleteAppointment/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'delete', resource: 'Appointment' }));
    }
}

export async function cancelAppointment(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/CancelAppointment/${id}`, {
        method: 'PATCH',
    });

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'cancel', resource: 'Appointment' }));
    }
}

export async function completeAppointment(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/CompleteAppointment/${id}`, {
        method: 'PATCH',
    });

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'update', resource: 'Appointment' }));
    }
}
