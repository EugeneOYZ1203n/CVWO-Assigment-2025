package handlers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func AddComment(c *fiber.Ctx) error {
	activityIDParam := c.Params("id")
	activityID, err := strconv.Atoi(activityIDParam)
	if err != nil {
		log.Println("Invalid activity_id:", activityIDParam)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid activity_id",
		})
	}

	type AddCommentRequest struct {
		UserID      int    `json:"user_id"`
		CommentBody string `json:"comment_body"`
	}

	var req AddCommentRequest
	if err := c.BodyParser(&req); err != nil {
		log.Println("Error parsing request body:", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	if req.UserID <= 0 || req.CommentBody == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid input data",
		})
	}

	query := `INSERT INTO comments (user_id, activity_id, comment_body) VALUES (?, ?, ?);`

	_, err = sqldb.DB.Exec(query, req.UserID, activityID, req.CommentBody)
	if err != nil {
		log.Println("Error inserting comment:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to add comment",
		})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"message": "Comment added successfully",
	})
}
