import type { Slot, CreateSlot, UpdateSlot } from "../types/slot";
import { getContextualErrorMessage } from "../utils/errorHandler";

const API_BASE_URL = "http://localhost:5141/api/Slot";

export async function fetchSlot(id: string): Promise<Slot> {
    const response = await fetch(`${API_BASE_URL}/GetSlotById/${id}`);

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Time Slot' }));
    }

    const slotData = await response.json();
    return slotData;
}

export async function fetchAllSlots(): Promise<Slot[]> {
    const response = await fetch(`${API_BASE_URL}/GetAllSlots`);

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Time Slots' }));
    }

    const slots = await response.json();
    return slots;
}

export async function fetchSlotsBySpecialistId(specialistId: string): Promise<Slot[]> {
    const response = await fetch(`${API_BASE_URL}/GetSlotsBySpecialistId/${specialistId}`);

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Time Slots' }));
    }

    const slots = await response.json();
    return slots;
}

export async function fetchSlotsByServiceId(serviceId: string): Promise<Slot[]> {
    const response = await fetch(`${API_BASE_URL}/GetSlotsByServiceId/${serviceId}`);

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Time Slots' }));
    }

    const slots = await response.json();
    return slots;
}

export async function fetchAvailableSlots(specialistId: string, startDate: string, endDate: string): Promise<Slot[]> {
    const response = await fetch(
        `${API_BASE_URL}/GetAvailableSlots?specialistId=${specialistId}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
    );

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Available Time Slots' }));
    }

    const slots = await response.json();
    return slots;
}

export async function fetchAvailableSlotsByService(serviceId: string, startDate: string, endDate: string): Promise<Slot[]> {
    const response = await fetch(
        `${API_BASE_URL}/GetAvailableSlotsByService?serviceId=${serviceId}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
    );

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Available Time Slots' }));
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
        throw new Error(getContextualErrorMessage(response, { action: 'create', resource: 'Time Slot' }));
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
        throw new Error(getContextualErrorMessage(response, { action: 'update', resource: 'Time Slot' }));
    }

    const updatedSlot = await response.json();
    return updatedSlot;
}

export async function deleteSlot(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/DeleteSlot/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'delete', resource: 'Time Slot' }));
    }
}

export async function bookSlot(slotId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/BookSlot/${slotId}`, {
        method: 'PATCH',
    });

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'book', resource: 'Time Slot' }));
    }
}

export async function releaseSlot(slotId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/ReleaseSlot/${slotId}`, {
        method: 'PATCH',
    });

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'update', resource: 'Time Slot' }));
    }
}
