import config from '../config';

export const getParticipants = async (activity_id : number): Promise<any[]> => {
    try {
      const response = await fetch(`http://localhost:${config.backendPort}/api/activities/${activity_id}/participants`, {
        method: "GET",  // GET request to fetch activities
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch participants for activity ID ${activity_id}`);
      }

      const data = await response.json();
      
      return data; 
    } catch (error) {
      console.error("Error fetching participants:", error);
      throw error;  
    }
  };