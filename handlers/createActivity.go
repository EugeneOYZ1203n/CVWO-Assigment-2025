package handlers

import (
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/models"
	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func CreateActivity(c *fiber.Ctx) error {
	type CreateActivityRequest struct {
		Title           string    `json:"title"`
		Description     string    `json:"description"`
		Category        string    `json:"category"`
		Location        string    `json:"location"`
		StartDate       time.Time `json:"start_date"`
		EndDate         time.Time `json:"end_date"`
		CreatorID       int       `json:"creator_id"`
		MaxParticipants int       `json:"max_participants"`
		Status          string    `json:"status"`
	}

	var req CreateActivityRequest
	if err := c.BodyParser(&req); err != nil {
		log.Println("Error parsing request body:", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	if req.CreatorID <= 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid or missing creator ID",
		})
	}

	isInvalidTitle := strings.TrimSpace(req.Title) == "" ||
		len(req.Title) > 100
	isInvalidDescription := strings.TrimSpace(req.Description) == "" ||
		len(req.Description) > 2000
	isInvalidDates := req.StartDate.IsZero() ||
		req.EndDate.IsZero() ||
		req.StartDate.After(req.EndDate)
	isInvalidLocation := strings.TrimSpace(req.Location) == "" ||
		len(req.Location) > 100
	isInvalidMaxParticipants := req.MaxParticipants <= 0 ||
		req.MaxParticipants > 50

	if isInvalidTitle ||
		isInvalidDescription ||
		isInvalidDates ||
		isInvalidLocation ||
		isInvalidMaxParticipants {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid inputs",
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

	insertQuery := `INSERT INTO activities (title, description, category, location, start_date, end_date, creator_id, max_participants, status) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
	_, err := sqldb.DB.Exec(insertQuery, req.Title, req.Description, req.Category, req.Location, req.StartDate, req.EndDate, req.CreatorID, req.MaxParticipants, req.Status)
	if err != nil {
		log.Println("Error inserting new activity:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create activity",
		})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"message": "Activity created successfully",
	})
}
