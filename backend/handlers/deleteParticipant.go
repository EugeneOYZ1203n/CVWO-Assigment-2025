package handlers

import (
	"log"
	"net/http"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func DeleteParticipant(c *fiber.Ctx) error {
	activityID := c.Params("id")
	if activityID == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Activity ID is required",
		})
	}

	type DeleteParticipantRequest struct {
		UserID int `json:"user_id"`
	}

	var req DeleteParticipantRequest
	if err := c.BodyParser(&req); err != nil {
		log.Println("Error parsing request body:", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
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

	_, err = sqldb.DB.Exec("DELETE FROM participants WHERE user_id = ? AND activity_id = ?", req.UserID, activityID)
	if err != nil {
		log.Println("Error deleting participant:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete participant",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Participant deleted successfully",
	})
}
