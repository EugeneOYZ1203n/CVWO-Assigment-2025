package handlers

import (
	"log"
	"net/http"
	"strings"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
)

func CreateUser(c *fiber.Ctx) error {
	type CreateUserRequest struct {
		Username string `json:"username"`
	}

	var req CreateUserRequest
	if err := c.BodyParser(&req); err != nil {
		log.Println("Error parsing request body:", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	if strings.TrimSpace(req.Username) == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Username is required",
		})
	}

	if len(req.Username) > 100 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Username is cannot be more than 100 characters",
		})
	}

	query := `INSERT INTO users (username) VALUES (?);`

	result, err := sqldb.DB.Exec(query, req.Username)
	if err != nil {
		if mysqlErr, ok := err.(*mysql.MySQLError); ok && mysqlErr.Number == 1062 {
			return c.Status(http.StatusConflict).JSON(fiber.Map{
				"error": "Username already exists",
			})
		}

		log.Println("Error inserting user:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create user",
		})
	}

	userID, err := result.LastInsertId()
	if err != nil {
		log.Println("Error retrieving last insert ID:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve user ID",
		})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"user_id":  userID,
		"username": req.Username,
		"message":  "User created successfully",
	})
}
