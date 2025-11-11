import { useState } from 'react';
import { fetchUser } from '../../shared/api/user';
import { UserRoles, type User } from '../../shared/types/user'

export function FetchUser() {
    const [userId, setUserId] = useState<string>("");
    const [user, setUser] = useState<User> ({
        id: "",
        fullName: "",
        email: "",
        role: UserRoles.User
    });
    const [error, setError] = useState<string | null>(null);

    const handleUserFetch = async () => {
        try {
            const data = await fetchUser(userId);
            setUser(data);
        }
        catch (err) {
            setError((err as Error).message);
        }
    }

    return (
        <div>
            <input type="text" placeholder="id" onChange={(e) => { setUserId(e.target.value) }}></input>
            <button onClick={handleUserFetch}>Fetch User</button>
            {error && <p>Error: {error}</p>}
            {user && !error && (
                <div>
                    <p>ID: {user.id}</p>
                    <p>Full Name: {user.fullName}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </div>
            )}
        </div>
    );
}