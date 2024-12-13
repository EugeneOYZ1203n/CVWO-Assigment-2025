package models

var AllowedCategories = map[string]bool{
	"Sports and Exercise":    true,
	"Outdoor Adventures":     true,
	"Shows and Movies":       true,
	"Creative Workshops":     true,
	"Museums and Culture":    true,
	"Social and Group Games": true,
	"Work and Study":         true,
	"Others":                 true,
}

var AllowedStatus = map[string]bool{
	"Planning":   true,
	"Finalizing": true,
	"Confirmed":  true,
	"Completed":  true,
}

type User struct {
	UserID    int    `json:"user_id"`    // Unique ID for the user
	Username  string `json:"username"`   // User's chosen username
	CreatedAt string `json:"created_at"` // When the account was created
}

type Activity struct {
	ActivityID       int    `json:"activity_id"`       // Unique ID for the activity
	Title            string `json:"title"`             // Title of the activity
	Description      string `json:"description"`       // Description of the activity
	Category         string `json:"category"`          // Category of the activity (e.g., "Sports", "Study", etc.)
	Location         string `json:"location"`          // Location of the activity
	StartDate        string `json:"start_date"`        // The start date and time of the activity
	EndDate          string `json:"end_date"`          // The end date and time of the activity
	CreatorID        int    `json:"creator_id"`        // User ID of the creator (foreign key)
	MaxParticipants  int    `json:"max_participants"`  // Maximum number of participants
	Status           string `json:"status"`            // Status of the activity (Planning, Finalizing, etc.)
	CreatedAt        string `json:"created_at"`        // When the activity was created
	UpdatedAt        string `json:"updated_at"`        // When the activity was last updated
	ParticipantCount int    `json:"participant_count"` // Number of participants for this activity
}

type Participant struct {
	ParticipantID int    `json:"participant_id"` // Unique ID for this participation record
	UserID        int    `json:"user_id"`        // Foreign key to the user
	ActivityID    int    `json:"activity_id"`    // Foreign key to the activity
	Username      string `json:"user_name"`      // User's chosen username, taken from User table
}

type Comment struct {
	CommentID   int    `json:"comment_id"`   // Unique ID for the comment
	UserID      int    `json:"user_id"`      // Foreign key to the user
	ActivityID  int    `json:"activity_id"`  // Foreign key to the activity
	CommentBody string `json:"comment_body"` // Body of the comment
	CreatedAt   string `json:"created_at"`   // Timestamp for when the comment was added
	Username    string `json:"user_name"`    // User's chosen username, taken from User table
}
