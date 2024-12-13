import config from '../config';
import { Activity } from '../types';

export const createActivity = async (activity : Activity, user_id : number): Promise<any[]> => {
  try {
    const response = await fetch(`http://localhost:${config.backendPort}/api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: activity.title,
        description: activity.description,
        category: activity.category,
        location: activity.location,
        start_date: activity.start_date,
        end_date: activity.end_date,
        creator_id: user_id,
        max_participants: activity.max_participants,
        status: activity.status
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create activity`);
    }

    const data = await response.json();
    
    return data; 
  } catch (error) {
    console.error("Error creating activity:", error);
    throw error;  
  }
};