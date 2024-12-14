import config from '../config';
import { Activity } from '../types';

export const updateActivity = async (activity : Activity): Promise<any[]> => {
  try {
    const response = await fetch(`${config.backendPath}/api/activities/${activity.activity_id}`, {
      method: "PATCH",
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
        max_participants: activity.max_participants,
        status: activity.status
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update activity`);
    }

    const data = await response.json();
    
    return data; 
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;  
  }
};