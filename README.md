# Demo REST API

This project demonstrates a simple REST API with Node and JavaScript.
It implements CRUD operations on a todo list.

## Database

For the API to work, we need a database named: tododb to exist and it needs a table called todo and fields as deicussed below.

```
DROP TABLE IF EXISTS todo;

CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    description character varying(255) NOT NULL
) WITH (oids = false);

INSERT INTO todo
  ( description )
VALUES
  ('Feed the dogs'),
  ('Wash the car'),
  ('Dinner date tonight');
```

To run this app locally, either setup your own datanbase with table as above, or use the docker container here for a Postgres database.

In the root of this project, run `docker compose up`
After the container is completely initialised and started
Visit http://localhost:8080

Login with the following details:
System: PostgreSQL
Server: db
Username: postgres
Password: root
Database: leave this blank
Permanent login: leave this unticker

Click login button

Click "create database" link
Add this exact database name: tododb
Click the save button
Click the "sql command" link, maing sure that DB: tododb and Schema: public is already selected
Copy and paste the sql from above
Click the execute button

## Env file

If it does not exist, create a .env file at the root of tis project and add the following keys. Adjust valuesa as necessary.

If USE_MOCK is true then mock data will be used and the database will be mocked too

```
PORT=3000

DB_HOST=localhost
DB_NAME=tododb
DB_USER=postgres
DB_PASSWORD=root

USE_MOCK=true
```

## Start the REST API

```
npm install
npm start
```

Visit http://localhost:3000

## Shut the REST API down

Press ctrl+c in your terminal

## API end-points

- get /
- get and post /todos
- get, put and delete /todos/id

## Testing the API with Postman

- Start the api as shown above
- Look in /postman folder in this project to locate the postman collection
- Open postman
- Import the postman collection
- Run the individual imported requests in postman
- Check the body tab for response data and check that tests under the tests tab (for each request) has passed
