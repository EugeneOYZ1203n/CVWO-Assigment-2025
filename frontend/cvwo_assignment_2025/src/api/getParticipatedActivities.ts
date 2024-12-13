import config from '../config';

export const getParticipatedActivities = async (user_id : number): Promise<any[]> => {
  try {
    const response = await fetch(`http://localhost:${config.backendPort}/api/users/${user_id}/activities`, {
      method: "GET",  // GET request to fetch activities
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch activities");
    }

    const data = await response.json();
    
    return data; 
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;  
  } 
};