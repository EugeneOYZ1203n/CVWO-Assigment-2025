package handlers

import (
	"log"
	"net/http"
	"time"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/models"
	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func UpdateActivity(c *fiber.Ctx) error {
	activityID := c.Params("id")
	if activityID == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Activity ID is required",
		})
	}

	type UpdateActivityRequest struct {
		Title           string    `json:"title"`
		Description     string    `json:"description"`
		Category        string    `json:"category"`
		Location        string    `json:"location"`
		StartDate       time.Time `json:"start_date"`
		EndDate         time.Time `json:"end_date"`
		MaxParticipants int       `json:"max_participants"`
		Status          string    `json:"status"`
	}

	var req UpdateActivityRequest
	if err := c.BodyParser(&req); err != nil {
		log.Println("Error parsing request body:", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	if req.Title == "" || req.StartDate.IsZero() || req.EndDate.IsZero() || req.MaxParticipants <= 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Missing required fields",
		})
	}

	if !models.AllowedCategories[req.Category] {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid category. Must be one of: Sports and Exercise, Outdoor Adventures, Shows and Movies, Creative Workshops, Museums and Culture, Social and Group Games.",
		})
	}

	if !models.AllowedStatus[req.Status] {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid status. Must be one of: Planning, Finalizing, Confirmed, Completed",
		})
	}

	// Might want to add some authorisation checks here so not everyone can edit activity details

	query := `
	UPDATE 
		activities SET 
		title = ?, 
		description = ?, 
		category = ?, 
		location = ?, 
		start_date = ?, 
		end_date = ?, 
		max_participants = ?, 
		status = ? 
	WHERE activity_id = ?
	`

	_, err := sqldb.DB.Exec(query,
		req.Title, req.Description, req.Category, req.Location,
		req.StartDate, req.EndDate, req.MaxParticipants, req.Status, activityID)
	if err != nil {
		log.Println("Error updating activity:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update activity",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Activity updated successfully",
	})
}
