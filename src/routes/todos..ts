import { Router } from 'express';
import { Todo } from '../models/todo';

const router = Router();

let todos: Todo[] = [];
type RequestParams = { todoId: string };
type RequestBody = { text: string };

router.get('/todos', (req, res, next) => {
    res.status(200).json({ todo: todos });
});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString().toString(),
        text: body.text
    }
    todos.push(newTodo);
    res.status(200).json({ message: 'ToDo added', todo: todos });
});

router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body as RequestBody;
    const params = req.params as RequestParams;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: body.text
        }
        return res.status(200).json({ message: 'ToDo edited', todo: todos });
    }
    res.status(404).json({ message: 'Edit failed' });
});

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const todoId = params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== todoId);
    res.status(200).json({ message: 'ToDo deleted', todo: todos });
});

export default router;
