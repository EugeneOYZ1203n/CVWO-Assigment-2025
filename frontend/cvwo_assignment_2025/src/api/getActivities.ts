import config from '../config';

export const getActivities = async (): Promise<any[]> => {
  try {
    const response = await fetch(`http://localhost:${config.backendPort}/api/activities`, {
      method: "GET", 
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