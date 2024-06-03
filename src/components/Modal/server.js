const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE tasks (id INTEGER PRIMARY KEY, name TEXT, completed BOOLEAN)');
});

app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(rows);
    }
  });
});

app.post('/tasks', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO tasks (name, completed) VALUES (?, ?)', [name, false], function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id: this.lastID, name, completed: false });
    }
  });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.run('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
