package handlers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/models"
	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func GetParticipants(c *fiber.Ctx) error {
	activityIDParam := c.Params("id")
	activityID, err := strconv.Atoi(activityIDParam)
	if err != nil {
		log.Println("Invalid activity_id:", activityIDParam)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid activity_id",
		})
	}

	query := `
	SELECT 
		p.participant_id, 
		p.activity_id, 
		p.user_id, 
		p.role, 
		u.username
	FROM participants p
	INNER JOIN users u ON p.user_id = u.user_id
	WHERE p.activity_id = ?;
	`

	rows, err := sqldb.DB.Query(query, activityID)
	if err != nil {
		log.Println("Error executing query:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch participants",
		})
	}
	defer rows.Close()

	participants := []models.Participant{}

	for rows.Next() {
		var participant models.Participant
		err := rows.Scan(
			&participant.ParticipantID,
			&participant.ActivityID,
			&participant.UserID,
			&participant.Role,
			&participant.Username,
		)
		if err != nil {
			log.Println("Error scanning row:", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to parse participants data",
			})
		}
		participants = append(participants, participant)
	}

	return c.JSON(participants)
}
