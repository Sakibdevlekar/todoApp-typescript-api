import {Router} from 'express';
const route = Router();
import {Todo} from '../models/todo';

type RequestBody = { text : string};
type RequestParams = { todoId : string};

let todos:Todo[] = []


route.get('/',(req,res)=>{
    res.status(200).json({message:"TS API",Todo:todos})
})


route.post('/add/todo',(req,res)=>{
    const body = req.body as RequestBody
    const newTodo:Todo = {
        id:new Date().toISOString(),
        text: body.text
    }
    todos.push(newTodo);
    res.status(200).json({message:"Todo Added",Todo:todos})
})


route.put('/update/todo/:todoId',(req,res)=>{
    const params = req.params as RequestParams
    const tid = params.todoId;
    const body = req.body as RequestBody
    const todoIndex = todos.findIndex((todoItem)=> todoItem.id === tid);
    if(todoIndex >=0){
        todos[todoIndex] = {id: todos[todoIndex].id, text:body.text};
        return res.status(200).json({message:"Todo Updated!",Todo:todos})
    }
    res.status(404).json({message:`Could Not Found Todo For This Id. ${tid}`})
})

route.delete('/delete/todo/:todoId',(req,res)=>{
    const params = req.params as RequestParams
    const tid = params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== tid);
    res.status(200).json({message:"Todo Deleted!",Todo:todos});
})


export default route ;