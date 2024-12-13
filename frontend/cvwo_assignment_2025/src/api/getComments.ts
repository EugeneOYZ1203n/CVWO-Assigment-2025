import config from '../config';

export const getComments = async (activity_id : number): Promise<any[]> => {
  try {
    const response = await fetch(`http://localhost:${config.backendPort}/api/activities/${activity_id}/comments`, {
      method: "GET",  
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch comments for activity ID ${activity_id}`);
    }

    const data = await response.json();
    
    return data; 
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;  
  }
};