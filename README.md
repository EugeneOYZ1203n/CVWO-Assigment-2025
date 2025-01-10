
# Hangout Hub

Hangout Hub is a web-based platform designed to help friends organize, join, and comment on various activities and events. By offering an intuitive and interactive environment, Hangout Hub simplifies group coordination while fostering social interactions. Users can create activity listings, invite participants, discuss plans, and keep track of event details seamlessly.

Tech Stack:
- React, Typescript frontend using Chakra UI
- Go Fiber backend communicating with the frontend via RESTful API handling CRUD operations
- MySQL Database on Railway with 4 tables, 3NF

Deployed at: https://hangout-hub.up.railway.app
(Using Railway)

*Note: The deployment is set to sleep if there is no traffic to reduce costs. Accessing the site might take a while to load if no one has accessed it in a while. Additionally, the first few backend calls will result in an error as the database will be sleeping.*


## Features

- 2 Pages, Auth Page and Main Page
- Basic Login based on just username, with user information stored in Database
    - Participated activities tied to each username
- Upcoming events list
- Search bar with sorting and filtering capability
- List of activites which summarises details regarding the activity
    - Vacancy, whether the user has joined, Category ...
- Adding, Editing and viewing activities
- Joining and Leaving activities
- Adding comments to activities
- Client and Server side input handling
    - Checking for white space inputs, long inputs, empty inputs, invalid dates
- Mobile friendly UI

Did not include more complex authentication like JWT. Previously implemented JWT in an older project: https://github.com/EugeneOYZ1203n/Developing-Bit-by-Bit

**Use of AI**

ChatGPT was used for brainstorming and generating code (Mainly repetitive and basic portions of code like API endpoints and React Components). However, it quickly became less reliable as the code base grew larger, after which I stopped using it entirely.
## Run Locally

### Cloning the Repo
Clone the project

```bash
  git clone https://github.com/EugeneOYZ1203n/CVWO-Assigment-2025.git
```

Go to the project directory

```bash
  cd my-project
```

Create a .env file and add the following variables
(If deploying to Railway, add the repo as a service and add the following variables. Replace "development" with "production" and for DB_URL, create a MySQL service and connect it to the Github repo service)

```text
DB_URL: <INSERT_DB_URL_HERE>
ENV: "development"
```

Run the main.go file

```bash
go run .\main.go
```

It should start listening on PORT 4000 if in development, the frontend will also be served on this PORT
## Authors

- Eugene Oh Yun Zheng: [@EugeneOYZ1203n](https://github.com/EugeneOYZ1203n)

