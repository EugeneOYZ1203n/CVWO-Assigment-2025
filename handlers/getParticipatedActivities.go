package handlers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func GetParticipatedActivities(c *fiber.Ctx) error {
	userIDParam := c.Params("id")
	userID, err := strconv.Atoi(userIDParam)
	if err != nil {
		log.Println("Invalid user_id:", userIDParam)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user_id",
		})
	}

	query := `
	SELECT activity_id 
	FROM participants
	WHERE user_id = ?
	`

	rows, err := sqldb.DB.Query(query, userID)
	if err != nil {
		log.Println("Error executing query:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch activities",
		})
	}
	defer rows.Close()

	var activity_ids []int

	for rows.Next() {
		var activity_id int
		err := rows.Scan(
			&activity_id,
		)
		if err != nil {
			log.Println("Error scanning row:", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to parse activity",
			})
		}
		activity_ids = append(activity_ids, activity_id)
	}

	return c.JSON(activity_ids)
}
