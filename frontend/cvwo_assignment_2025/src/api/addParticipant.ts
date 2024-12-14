import config from '../config';

export const addParticipant = async (user_id: number, activity_id : number): Promise<any[]> => {
  try {
    const response = await fetch(`${config.backendPath}/api/activities/${activity_id}/participants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add participant for activity ID ${activity_id}`);
    }

    const data = await response.json();
    
    return data; 
  } catch (error) {
    console.error("Error adding participant:", error);
    throw error;  
  }
};