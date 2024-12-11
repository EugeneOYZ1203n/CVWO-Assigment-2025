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
		activity_id, 
		title, 
		description, 
		category, 
		location, 
		start_date, 
		end_date, 
		creator_id, 
		max_participants, 
		status, 
		created_at, 
		updated_at 
	FROM activities
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
