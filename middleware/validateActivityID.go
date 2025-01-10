package middleware

import (
	"log"
	"net/http"
	"strconv"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func ValidateActivityID(c *fiber.Ctx) error {
	activityID, err := strconv.Atoi(c.Params("id"))
	if err != nil || activityID <= 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid activity ID",
		})
	}

	var exists bool
	query := `SELECT EXISTS(SELECT 1 FROM activities WHERE activity_id = ?)`
	err = sqldb.DB.QueryRow(query, activityID).Scan(&exists)
	if err != nil {
		log.Println("Error checking activity existence:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to verify activity ID",
		})
	}

	if !exists {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{
			"error": "Activity not found",
		})
	}

	return c.Next()
}
