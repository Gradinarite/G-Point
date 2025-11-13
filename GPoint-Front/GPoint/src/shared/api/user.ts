import type { CreateUser, UpdateUser, User } from "../types/user";

const API_BASE_URL = "http://localhost:5141/api/User";

export async function fetchUser(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/GetUserById/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch user data. Status: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
}

export async function fetchUserByEmail(email: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/GetUserByEmail?email=${encodeURIComponent(email)}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch user by email. Status: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
}

export async function fetchAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/GetAllUsers`);

    if (!response.ok) {
        throw new Error(`Failed to fetch all users. Status: ${response.status}`);
    }

    const users = await response.json();
    return users;
}

export async function fetchSpecialists(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/GetSpecialists`);

    if (!response.ok) {
        throw new Error(`Failed to fetch specialists. Status: ${response.status}`);
    }

    const specialists = await response.json();
    return specialists;
}

export async function createUser(userData: CreateUser): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/CreateUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create user. Status: ${response.status}`);
    }

    const createdUser = await response.json();
    return createdUser;
}

export async function updateUser(id: string, userData: UpdateUser): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/UpdateUser/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error(`Failed to update user. Status: ${response.status}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
}

export async function deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/DeleteUserById?id=${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete user. Status: ${response.status}`);
    }
}