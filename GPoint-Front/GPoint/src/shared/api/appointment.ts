import type { Appointment, CreateAppointment, UpdateAppointment } from "../types/appointment";

const API_BASE_URL = "http://localhost:5141/api/Appointment";

export async function fetchAppointment(id: string): Promise<Appointment> {
    const response = await fetch(`${API_BASE_URL}/GetAppointmentById/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch appointment data. Status: ${response.status}`);
    }

    const appointmentData = await response.json();
    return appointmentData;
}

export async function fetchAllAppointments(): Promise<Appointment[]> {
    const response = await fetch(`${API_BASE_URL}/GetAllAppointments`);

    if (!response.ok) {
        throw new Error(`Failed to fetch all appointments. Status: ${response.status}`);
    }

    const appointments = await response.json();
    return appointments;
}

export async function fetchAppointmentsByUserId(userId: string): Promise<Appointment[]> {
    const response = await fetch(`${API_BASE_URL}/GetAppointmentsByUserId/${userId}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch appointments by user ID. Status: ${response.status}`);
    }

    const appointments = await response.json();
    return appointments;
}

export async function fetchAppointmentsBySpecialistId(specialistId: string): Promise<Appointment[]> {
    const response = await fetch(`${API_BASE_URL}/GetAppointmentsBySpecialistId/${specialistId}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch appointments by specialist ID. Status: ${response.status}`);
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
        throw new Error(`Failed to create appointment. Status: ${response.status}`);
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
        throw new Error(`Failed to update appointment. Status: ${response.status}`);
    }

    const updatedAppointment = await response.json();
    return updatedAppointment;
}

export async function deleteAppointment(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/DeleteAppointment/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete appointment. Status: ${response.status}`);
    }
}

export async function cancelAppointment(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/CancelAppointment/${id}`, {
        method: 'PATCH',
    });

    if (!response.ok) {
        throw new Error(`Failed to cancel appointment. Status: ${response.status}`);
    }
}
