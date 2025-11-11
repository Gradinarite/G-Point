export async function fetchUser(id: string) {
    const response = await fetch(`http://localhost:5141/api/User/GetUserById/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch user data. Status: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
}