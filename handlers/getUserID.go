package handlers

import (
	"log"
	"net/http"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func GetUserID(c *fiber.Ctx) error {
	username := c.Params("username")
	if username == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Username is required",
		})
	}

	query := `SELECT user_id FROM users WHERE username = ?;`

	var userID int
	err := sqldb.DB.QueryRow(query, username).Scan(&userID)
	if err != nil {
		log.Println("Error fetching user ID:", err)
		return c.Status(http.StatusNotFound).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	return c.JSON(fiber.Map{
		"user_id": userID,
	})
}
