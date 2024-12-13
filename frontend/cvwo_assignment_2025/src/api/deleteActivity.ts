import config from '../config';

export const deleteActivity = async (activity_id : number): Promise<any[]> => {
  try {
    const response = await fetch(`http://localhost:${config.backendPort}/api/activities/${activity_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete activity of ID ${activity_id}`);
    }

    const data = await response.json();
    
    return data; 
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;  
  }
};