const Pool = require("pg").Pool;

let pool;
const useMock = process.env.USE_MOCK === "true" || false;
let mockTodo = [];
let mockIds = [];

function generateId() {
  return mockIds.pop();
}

if (useMock) {
  mockIds = Array.from(Array(1000).keys()).reverse();
  mockIds.pop();

  mockTodo = [
    {
      id: generateId(),
      description: "Feed the dogs",
    },
    {
      id: generateId(),
      description: "Wash the car",
    },
    {
      id: generateId(),
      description: "Dinner date tonight",
    },
  ];
}

if (!useMock) {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PASSWORD,
  });
}

const getTodos = (request, response) => {
  if (useMock) {
    response.status(200).json(mockTodo);
  } else {
    pool.query("SELECT * FROM todo ORDER BY id ASC", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }
};

const getTodoById = (request, response) => {
  const id = parseInt(request.params.id);
  console.log(id);
  if (useMock) {
    const result = mockTodo.filter((item) => item.id === id);
    response.status(200).json(result);
  } else {
    pool.query("SELECT * FROM todo WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }
};

const createTodo = (request, response) => {
  const { description } = request.body;
  if (useMock) {
    const id = generateId();
    const item = {
      id: id,
      description: description,
    };
    mockTodo.push(item);
    response.status(201).send(`Todo added with ID: ${id}`);
  } else {
    pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`Todo added with ID: ${results.rows[0].id}`);
      }
    );
  }
};

const updateTodo = (request, response) => {
  const id = parseInt(request.params.id);
  const { description } = request.body;
  if (useMock) {
    const items = mockTodo.filter((item) => item.id === id);
    const item = items.length > 0 ? items[0] : { id: id, description: "" };
    item.description = description;
    mockTodo = mockTodo.filter((todo) => todo.id !== id);
    mockTodo.push(item);
    response.status(200).send(`Todo modified with ID: ${id}`);
  } else {
    pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2",
      [description, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`Todo modified with ID: ${id}`);
      }
    );
  }
};

const deleteTodo = (request, response) => {
  const id = parseInt(request.params.id);
  if (useMock) {
    mockTodo = mockTodo.filter((todo) => todo.id !== id);
    response.status(200).send(`Todo deleted with ID: ${id}`);
  } else {
    pool.query("DELETE FROM todo WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Todo deleted with ID: ${id}`);
    });
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
