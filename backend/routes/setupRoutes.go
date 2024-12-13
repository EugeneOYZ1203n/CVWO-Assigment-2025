package routes

import (
	"os"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/handlers"
	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func SetupRoutes(app *fiber.App) {
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")

	app.Use(cors.New(cors.Config{
		AllowOrigins: allowedOrigins,          // Allow your frontend's URL in development
		AllowMethods: "GET,POST,PATCH,DELETE", // Allow these HTTP methods
	}))

	api := app.Group("/api")
	act := api.Group("/activities/:id", middleware.ValidateActivityID)

	api.Get("/activities", handlers.GetActivities)                       // GET /api/activities
	act.Get("/participants", handlers.GetParticipants)                   // GET /api/activities/1/participants
	act.Get("/comments", handlers.GetComments)                           // GET /api/activities/1/comments
	api.Get("/users/:username/id", handlers.GetUserID)                   // GET /api/users/Alice/id
	api.Get("/users/:id/activities", handlers.GetParticipatedActivities) // GET /api/users/1/activities

	api.Post("/users", handlers.CreateUser)            // POST /api/users
	act.Post("/participants", handlers.AddParticipant) // POST /api/activities/1/participants
	act.Post("/comments", handlers.AddComment)         // POST /api/activities/1/comments
	api.Post("/activities", handlers.CreateActivity)   // POST /api/activities

	act.Patch("", handlers.UpdateActivity) // PATCH /api/activities/2

	act.Delete("", handlers.DeleteActivity)                 // DELETE /api/activities/2
	act.Delete("/participants", handlers.DeleteParticipant) // DELETE /api/activities/2/participants
}
