package handlers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/models"
	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	"github.com/gofiber/fiber/v2"
)

func GetComments(c *fiber.Ctx) error {
	activityIDParam := c.Params("id")
	activityID, err := strconv.Atoi(activityIDParam)
	if err != nil {
		log.Println("Invalid activity_id:", activityIDParam)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid activity_id",
		})
	}

	query := `
	SELECT 
		c.comment_id,
		c.activity_id,
		c.user_id,
		c.comment_body,
		u.username,
		c.created_at AS comment_created_at
	FROM comments c
	INNER JOIN users u ON c.user_id = u.user_id
	WHERE c.activity_id = ?;
	`

	rows, err := sqldb.DB.Query(query, activityID)
	if err != nil {
		log.Println("Error executing query:", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch participants",
		})
	}
	defer rows.Close()

	comments := []models.Comment{}

	for rows.Next() {
		var comment models.Comment
		err := rows.Scan(
			&comment.CommentID,
			&comment.ActivityID,
			&comment.UserID,
			&comment.CommentBody,
			&comment.Username,
			&comment.CreatedAt,
		)
		if err != nil {
			log.Println("Error scanning row:", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to parse comments data",
			})
		}
		comments = append(comments, comment)
	}

	return c.JSON(comments)
}
