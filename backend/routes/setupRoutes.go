package routes

import (
	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/handlers"
	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	act := api.Group("/activities/:id", middleware.ValidateActivityID)

	api.Get("/activities", handlers.GetActivities)     // GET /api/activities
	act.Get("/participants", handlers.GetParticipants) // GET /api/activities/1/participants
	act.Get("/comments", handlers.GetComments)         // GET /api/activities/1/comments
	api.Get("/users/:username/id", handlers.GetUserID) // GET /api/users/Alice/id

	api.Post("/users", handlers.CreateUser)            // POST /api/users
	act.Post("/participants", handlers.AddParticipant) // POST /api/activities/1/participants
	act.Post("/comments", handlers.AddComment)         // POST /api/activities/1/comments
	api.Post("/activities", handlers.CreateActivity)   // POST /api/activities

	act.Patch("", handlers.UpdateActivity)                 // PATCH /api/activities/2
	act.Patch("/participants", handlers.UpdateParticipant) // PATCH /api/activities/2/participants

	act.Delete("", handlers.DeleteActivity)                 // DELETE /api/activities/2
	act.Delete("/participants", handlers.DeleteParticipant) // DELETE /api/activities/2/participants
}
