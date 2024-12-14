import config from '../config';

interface UserIDData {
    user_id: number;
}

export const createUserAndGetUserID = async (username:string): Promise<UserIDData> => {
    try {
        const response = await fetch(`${config.backendPath}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username
        }),
        });

        if (!response.ok) {
            if (response.status !== 409) {
                throw new Error(`Failed to create user ${username}`);
            }
        } else {
            const data = await response.json();
        
            return data
        }
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;  
    }

    try {
        const response = await fetch(`${config.backendPath}/api/users/${username}/id`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
        });

        if (!response.ok) {
            throw new Error(`Failed to get user ID of ${username}`);
        } 

        const data = await response.json();
    
        return data
    } catch (error) {
        console.error("Error getting user ID:", error);
        throw error;  
    }
};