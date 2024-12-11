package handlers

import (
	"log"
	"net/http"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func DeleteActivity(c *fiber.Ctx) error {
	activityID := c.Params("id")
	if activityID == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Activity ID is required",
		})
	}

	// Might want check authorization here actually, hmm seems kinda important

	_, err := sqldb.DB.Exec("DELETE FROM comments WHERE activity_id = ?", activityID)
	if err != nil {
		log.Println("Error deleting comments:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete comments",
		})
	}

	_, err = sqldb.DB.Exec("DELETE FROM participants WHERE activity_id = ?", activityID)
	if err != nil {
		log.Println("Error deleting participants:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete participants",
		})
	}

	_, err = sqldb.DB.Exec("DELETE FROM activities WHERE activity_id = ?", activityID)
	if err != nil {
		log.Println("Error deleting activity:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete activity",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Activity deleted successfully",
	})
}
