"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
let todos = [];
route.get('/', (req, res) => {
    res.status(200).json({ message: "TS API", Todo: todos });
});
route.post('/add/todo', (req, res) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(200).json({ message: "Todo Added", Todo: todos });
});
route.put('/update/todo/:todoId', (req, res) => {
    const params = req.params;
    const tid = params.todoId;
    const body = req.body;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: "Todo Updated!", Todo: todos });
    }
    res.status(404).json({ message: `Could Not Found Todo For This Id. ${tid}` });
});
route.delete('/delete/todo/:todoId', (req, res) => {
    const params = req.params;
    const tid = params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== tid);
    res.status(200).json({ message: "Todo Deleted!", Todo: todos });
});
exports.default = route;
