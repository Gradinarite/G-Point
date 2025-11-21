import type { Service, CreateService, UpdateService } from "../types/service";
import { getContextualErrorMessage } from "../utils/errorHandler";

const API_BASE_URL = "http://localhost:5141/api/Service";

export async function fetchService(id: string): Promise<Service> {
    const response = await fetch(`${API_BASE_URL}/GetServiceById/${id}`);

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Service' }));
    }

    const serviceData = await response.json();
    return serviceData;
}

export async function fetchAllServices(): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/GetAllServices`);

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Services' }));
    }

    const services = await response.json();
    return services;
}

export async function fetchServicesBySpecialistId(specialistId: string): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/GetServicesBySpecialistId/${specialistId}`);

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'fetch', resource: 'Services' }));
    }

    const services = await response.json();
    return services;
}

export async function createService(serviceData: CreateService): Promise<Service> {
    const response = await fetch(`${API_BASE_URL}/CreateService`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'create', resource: 'Service' }));
    }

    const createdService = await response.json();
    return createdService;
}

export async function updateService(serviceData: UpdateService): Promise<Service> {
    const response = await fetch(`${API_BASE_URL}/UpdateService`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'update', resource: 'Service' }));
    }

    const updatedService = await response.json();
    return updatedService;
}

export async function deleteService(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/DeleteService/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(getContextualErrorMessage(response, { action: 'delete', resource: 'Service' }));
    }
}
