package sqldb

import (
	"database/sql"
	"fmt"
	"log"
	"net/url"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var DB *sql.DB

func getDatabaseURL() string {
	// Get the JAWSDB_URL environment variable
	dbURL := os.Getenv("JAWSDB_URL")
	if dbURL == "" {
		log.Fatal("JAWSDB_URL environment variable not set")
	}

	// Parse the URL
	u, err := url.Parse(dbURL)
	if err != nil {
		log.Fatalf("Error parsing JAWSDB_URL: %v", err)
	}

	// Extract credentials
	user := u.User.Username()
	password, _ := u.User.Password()
	host := u.Host
	database := u.Path[1:] // Remove leading "/"

	// Format as MySQL DSN (Data Source Name)
	return fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", user, password, host, database)
}

func SetupDatabase() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	dsn := getDatabaseURL()

	fmt.Printf("DSN for JawsDB is: %v \n", dsn)

	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Open doesn't open a connection. Validate DSN data:
	if err := DB.Ping(); err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}

	fmt.Println("Database connected successfully!")

	// See "Important settings" section.
	DB.SetConnMaxLifetime(time.Minute * 3)
	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(10)
}
