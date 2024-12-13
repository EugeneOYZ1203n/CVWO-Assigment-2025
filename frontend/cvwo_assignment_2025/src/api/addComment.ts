import config from '../config';

export const addComment = async (user_id: number, comment_body: string, activity_id : number): Promise<any[]> => {
  try {
    const response = await fetch(`http://localhost:${config.backendPort}/api/activities/${activity_id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        comment_body: comment_body,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add comment for activity ID ${activity_id}`);
    }

    const data = await response.json();
    
    return data; 
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;  
  }
};