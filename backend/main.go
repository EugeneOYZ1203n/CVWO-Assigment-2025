package main

import (
	"log"
	"os"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/routes"
	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
)

func main() {
	sqldb.SetupDatabase()

	app := fiber.New()

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000" // Default to 3000 if running locally
	}

	log.Fatal(app.Listen(":" + port))
}
