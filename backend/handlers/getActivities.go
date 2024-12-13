package handlers

import (
	"log"
	"net/http"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/models"
	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func GetActivities(c *fiber.Ctx) error {
	query := `
	SELECT 
		a.activity_id, 
		a.title, 
		a.description, 
		a.category, 
		a.location, 
		a.start_date, 
		a.end_date, 
		a.creator_id, 
		a.max_participants, 
		a.status, 
		a.created_at, 
		a.updated_at,
		COALESCE(COUNT(p.user_id), 0) AS participant_count
	FROM activities a
	LEFT JOIN participants p ON p.activity_id = a.activity_id
	GROUP BY a.activity_id
	`

	rows, err := sqldb.DB.Query(query)
	if err != nil {
		log.Println("Error executing query:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch activities",
		})
	}
	defer rows.Close()

	activities := []models.Activity{}

	for rows.Next() {
		var activity models.Activity

		err := rows.Scan(
			&activity.ActivityID,
			&activity.Title,
			&activity.Description,
			&activity.Category,
			&activity.Location,
			&activity.StartDate,
			&activity.EndDate,
			&activity.CreatorID,
			&activity.MaxParticipants,
			&activity.Status,
			&activity.CreatedAt,
			&activity.UpdatedAt,
			&activity.ParticipantCount,
		)
		if err != nil {
			log.Println("Error scanning row:", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to parse activities data",
			})
		}

		activities = append(activities, activity)
	}

	return c.JSON(activities)
}
