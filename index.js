const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let todos = [];


app.get('/', (req, res) => {
    res.send('Welcome to the To-Do List API');
});


app.post('/todos', (req, res) => {
    const { text } = req.body;
    const newTodo = { id: uuidv4(), text, isCompleted: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});


app.get('/todos', (req, res) => {
    res.json(todos);
});


app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});


app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { text, isCompleted } = req.body;
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        if (text !== undefined) todo.text = text;
        if (isCompleted !== undefined) todo.isCompleted = isCompleted;
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});


app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
