"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todo: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString().toString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(200).json({ message: 'ToDo added', todo: todos });
});
router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body;
    const params = req.params;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: body.text
        };
        return res.status(200).json({ message: 'ToDo edited', todo: todos });
    }
    res.status(404).json({ message: 'Edit failed' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const todoId = params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== todoId);
    res.status(200).json({ message: 'ToDo deleted', todo: todos });
});
exports.default = router;
