import express, { Request, Response } from 'express'
import { Todo } from '../models/todo';
import { asyncHandler } from '../middlewares/async';


const router = express.Router();

const getCategories = asyncHandler(async (req: Request, res: Response) => {
    const todo = await Todo.find()
    return res.status(200).send(todo)
});

router.route("/api/todo").get(getCategories);

// router.get('/api/todo', [], async (req: Request, res: Response) => {
//     const todo = await Todo.find()
//     return res.status(200).send(todo)
// })

router.post('/api/todo', async (req, res) => {
    const { title, description } = req.body;
    const todo = Todo.build({ title, description })
    const result = await todo.save()
    console.log(result)
    return res.status(201).send(todo)
})

export { router as todoRouter }