export interface Activity {
    activity_id: number;
    title: string;
    description: string;
    category: string;
    start_date: string; // ISO 8601 format (e.g., "2024-12-12T10:00:00Z")
    end_date: string; // ISO 8601 format (e.g., "2024-12-12T10:00:00Z")
    location: string;
    max_participants: number;
    status: string; 
    created_at: string; // ISO 8601 format (e.g., "2024-12-12T10:00:00Z")
    updated_at: string; // ISO 8601 format (e.g., "2024-12-12T10:00:00Z")
    participant_count: number; 
}
  
export interface Participant {
    participant_id: number;
    user_id: number;
    activity_id: number;
    user_name: string;
}

export interface Comment {
    comment_id: number;
    activity_id: number;
    user_id: number;
    comment_body: string;
    user_name: string;
    created_at: string; // ISO 8601 format (e.g., "2024-12-12T10:00:00Z")
}