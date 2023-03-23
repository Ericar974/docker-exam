const express = require("express");
const config = require("./db.config");

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: config.HOST,
    port: config.PORT,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
  },
});

const cors = require("cors");
const app = express();

const port = 4001
app.use(express.json());
app.use(cors());

app.get('/todos', async (req, res) => {
  try {
    const todos = await db('todos').select('*');
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/todos', async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = await db('todos').insert({ title, description });
    res.json({ id: todo[0], title, description });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.delete('/todos/:todoId', async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const todo = await db('todos').where('id', todoId).del();
    if (todo) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
