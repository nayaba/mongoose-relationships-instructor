/*------------------------------ Starter Code ------------------------------*/
const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const Todo = require('./models/todo')

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
    await runQueries()

    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
    process.exit()
}

connect()

/*----------------------------- Query Functions -----------------------------*/

const createTodo = async () => {
    const todoData = {
        text: 'learn React',
        isComplete: false
    }

    const todo = await Todo.create(todoData)
    console.log('New todo: ', todo)
}

const findTodos = async () => {
    const todos = await Todo.find({})
    console.log('All todos: ', todos)
}

// create subtask
const createSubtask = async () => {
    const todoId = '6715f772c795ab2d1780d210'
    const todo = await Todo.findById(todoId)

    const subtaskData = {
        text: 'Learn how props work',
        isComplete: false,
    }

    const subtask = todo.subtasks.push(subtaskData)
    await todo.save()
    console.log('Modified todo: ', todo)
}

// show - find one subtask
const findSubtask = async () => {
    const todoId = '6715f772c795ab2d1780d210'
    const subtaskId = '6715fe95f088864a64141776'

    const todo = await Todo.findById(todoId)
    const subTask = todo.subtasks.id(subtaskId)

    console.log('Subdocument: ', subTask)

}

// todo id = 6715f772c795ab2d1780d210
// subtask id = 6715fe95f088864a64141776
/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
    console.log('Queries running')
    // await createTodo()
    // await findTodos()
    // await createSubtask()
    await findSubtask()
}