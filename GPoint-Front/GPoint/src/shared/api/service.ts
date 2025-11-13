import type { Service, CreateService, UpdateService } from "../types/service";

const API_BASE_URL = "http://localhost:5141/api/Service";

export async function fetchService(id: string): Promise<Service> {
    const response = await fetch(`${API_BASE_URL}/GetServiceById/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch service data. Status: ${response.status}`);
    }

    const serviceData = await response.json();
    return serviceData;
}

export async function fetchAllServices(): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/GetAllServices`);

    if (!response.ok) {
        throw new Error(`Failed to fetch all services. Status: ${response.status}`);
    }

    const services = await response.json();
    return services;
}

export async function fetchServicesBySpecialistId(specialistId: string): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/GetServicesBySpecialistId/${specialistId}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch services by specialist ID. Status: ${response.status}`);
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
        throw new Error(`Failed to create service. Status: ${response.status}`);
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
        throw new Error(`Failed to update service. Status: ${response.status}`);
    }

    const updatedService = await response.json();
    return updatedService;
}

export async function deleteService(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/DeleteService/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete service. Status: ${response.status}`);
    }
}
