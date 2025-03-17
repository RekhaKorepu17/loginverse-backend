### Cloud-adventure server
It is the backend server application that serves backend for the cloud adventure application.It includes API calls, database connection and dtabase models.

#### Database connection.
It connects to AMazon RDS database instance with the provided configuration. But before running the application, make sure to update the environment variables like host, username and password and specify them correctly.

#### User Models and routes.
It includes a route for posting user details into the database. When a API request is made from the front-end, the route is designed to add user details into the database.
