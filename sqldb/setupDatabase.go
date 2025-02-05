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
	dbURL := os.Getenv("DB_URL")
	if dbURL == "" {
		log.Fatal("DB_URL environment variable not set")
	}

	u, err := url.Parse(dbURL)
	if err != nil {
		log.Fatalf("Error parsing DB_URL: %v", err)
	}

	user := u.User.Username()
	password, _ := u.User.Password()
	host := u.Host
	database := u.Path[1:] // Remove leading "/"

	return fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", user, password, host, database)
}

func SetupDatabase() {
	if os.Getenv("ENV") != "production" {
		err := godotenv.Load()
		if err != nil {
			log.Fatalf("Error loading .env file: %v", err)
		}
	}

	dsn := getDatabaseURL()

	fmt.Printf("DSN for DB is: %v \n", dsn)

	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Open doesn't open a connection. Validate DSN data:
	if err := DB.Ping(); err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}

	fmt.Println(DB)

	fmt.Println("Database connected successfully!")

	// See "Important settings" section.
	DB.SetConnMaxLifetime(time.Minute * 3)
	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(10)
}
