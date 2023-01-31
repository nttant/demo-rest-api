require("dotenv").config();
const db = require("./src/queries");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (_, response) => {
  response.json({ info: "Node.js with Express API" });
});

app.get("/todos", db.getTodos);

app.get("/todos/:id", db.getTodoById);

app.post("/todos", db.createTodo);

app.put("/todos/:id", db.updateTodo);

app.delete("/todos/:id", db.deleteTodo);

app.listen(port, () => {
  console.log(`API running on port ${port}.`);
  console.log(`http://localhost:${port}`);
});
