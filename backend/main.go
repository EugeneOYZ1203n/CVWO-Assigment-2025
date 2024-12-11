package main

import (
	"log"

	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/routes"
	"github.com/EugeneOYZ1203n/CVWO-Assigment-2025/sqldb"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
)

func main() {
	sqldb.SetupDatabase()

	app := fiber.New()

	routes.SetupRoutes(app)

	log.Fatal(app.Listen(":4000"))
}
