package handlers

import (
	"log"
	"net/http"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func UpdateParticipant(c *fiber.Ctx) error {
	activityID := c.Params("id")
	if activityID == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Activity ID is required",
		})
	}

	type UpdateParticipantRequest struct {
		UserID int    `json:"user_id"`
		Role   string `json:"role"` // "Participant" or "Organizer"
	}

	var req UpdateParticipantRequest
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
	err := sqldb.DB.QueryRow(exist_query, req.UserID, activityID).Scan(&exists)
	if err != nil {
		log.Println("Error checking participant existence:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to verify participant",
		})
	}
	if !exists {
		return c.Status(http.StatusConflict).JSON(fiber.Map{
			"error": "User is not a participant in this activity",
		})
	}

	query := "UPDATE participants SET role = ? WHERE user_id = ? AND activity_id = ?"

	_, err = sqldb.DB.Exec(query, req.Role, req.UserID, activityID)
	if err != nil {
		log.Println("Error updating participant role:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update participant role",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Participant role updated successfully",
	})
}
