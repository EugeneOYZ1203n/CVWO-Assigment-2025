package handlers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func AddParticipant(c *fiber.Ctx) error {
	activityIDParam := c.Params("id")
	activityID, err := strconv.Atoi(activityIDParam)
	if err != nil {
		log.Println("Invalid activity_id:", activityIDParam)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid activity_id",
		})
	}

	type AddParticipantRequest struct {
		UserID int    `json:"user_id"`
		Role   string `json:"role"` // "Participant" or "Organizer"
	}

	var req AddParticipantRequest
	if err := c.BodyParser(&req); err != nil {
		log.Println("Error parsing request body:", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	if req.UserID <= 0 || (req.Role != "Participant" && req.Role != "Organizer") {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid input data",
		})
	}

	var exists bool
	exist_query := `SELECT EXISTS(SELECT 1 FROM participants WHERE user_id = ? AND activity_id = ?)`
	err = sqldb.DB.QueryRow(exist_query, req.UserID, activityID).Scan(&exists)
	if err != nil {
		log.Println("Error checking participant existence:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to verify participant",
		})
	}
	if exists {
		return c.Status(http.StatusConflict).JSON(fiber.Map{
			"error": "User is already a participant in this activity",
		})
	}

	query := `INSERT INTO participants (user_id, activity_id, role) VALUES (?, ?, ?);`

	_, err = sqldb.DB.Exec(query, req.UserID, activityID, req.Role)
	if err != nil {
		log.Println("Error inserting participant:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to add participant",
		})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"message": "Participant added successfully",
	})
}
