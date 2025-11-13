import type { Slot, CreateSlot, UpdateSlot } from "../types/slot";

const API_BASE_URL = "http://localhost:5141/api/Slot";

export async function fetchSlot(id: string): Promise<Slot> {
    const response = await fetch(`${API_BASE_URL}/GetSlotById/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch slot data. Status: ${response.status}`);
    }

    const slotData = await response.json();
    return slotData;
}

export async function fetchAllSlots(): Promise<Slot[]> {
    const response = await fetch(`${API_BASE_URL}/GetAllSlots`);

    if (!response.ok) {
        throw new Error(`Failed to fetch all slots. Status: ${response.status}`);
    }

    const slots = await response.json();
    return slots;
}

export async function fetchSlotsBySpecialistId(specialistId: string): Promise<Slot[]> {
    const response = await fetch(`${API_BASE_URL}/GetSlotsBySpecialistId/${specialistId}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch slots by specialist ID. Status: ${response.status}`);
    }

    const slots = await response.json();
    return slots;
}

export async function fetchSlotsByServiceId(serviceId: string): Promise<Slot[]> {
    const response = await fetch(`${API_BASE_URL}/GetSlotsByServiceId/${serviceId}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch slots by service ID. Status: ${response.status}`);
    }

    const slots = await response.json();
    return slots;
}

export async function fetchAvailableSlots(specialistId: string, startDate: string, endDate: string): Promise<Slot[]> {
    const response = await fetch(
        `${API_BASE_URL}/GetAvailableSlots?specialistId=${specialistId}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch available slots. Status: ${response.status}`);
    }

    const slots = await response.json();
    return slots;
}

export async function fetchAvailableSlotsByService(serviceId: string, startDate: string, endDate: string): Promise<Slot[]> {
    const response = await fetch(
        `${API_BASE_URL}/GetAvailableSlotsByService?serviceId=${serviceId}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch available slots by service. Status: ${response.status}`);
    }

    const slots = await response.json();
    return slots;
}

export async function createSlot(slotData: CreateSlot): Promise<Slot> {
    const response = await fetch(`${API_BASE_URL}/CreateSlot`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(slotData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create slot. Status: ${response.status}`);
    }

    const createdSlot = await response.json();
    return createdSlot;
}

export async function updateSlot(slotData: UpdateSlot): Promise<Slot> {
    const response = await fetch(`${API_BASE_URL}/UpdateSlot`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(slotData),
    });

    if (!response.ok) {
        throw new Error(`Failed to update slot. Status: ${response.status}`);
    }

    const updatedSlot = await response.json();
    return updatedSlot;
}

export async function deleteSlot(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/DeleteSlot/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete slot. Status: ${response.status}`);
    }
}

export async function bookSlot(slotId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/BookSlot/${slotId}`, {
        method: 'PATCH',
    });

    if (!response.ok) {
        throw new Error(`Failed to book slot. Status: ${response.status}`);
    }
}

export async function releaseSlot(slotId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/ReleaseSlot/${slotId}`, {
        method: 'PATCH',
    });

    if (!response.ok) {
        throw new Error(`Failed to release slot. Status: ${response.status}`);
    }
}
