/*------------------------------ Starter Code ------------------------------*/
const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const Todo = require('./models/todo')
const User = require('./models/user')

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
    const todos = await Todo.find({}).populate('assignee')
    console.log('All todos: ', todos)
}

// create subtask
const createSubtask = async () => {
    const todoId = '6715f772c795ab2d1780d210'
    const todo = await Todo.findById(todoId)

    const subtaskData = {
        text: 'Eat lunch',
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

// delete - remove a subtask
const removeSubtask = async () => {
    const todoId = '6715f772c795ab2d1780d210'
    const subtaskId = '6715fe95f088864a64141776'

    const todo = await Todo.findById(todoId)
    todo.subtasks.pull(subtaskId)

    await todo.save()

    console.log('Updated document: ', todo)
}

// update a subtask
const updateSubtask = async () => {
    const todoId = '6715f772c795ab2d1780d210'
    const subtaskId = '671603bafea347cfe241664b'

    const todo = await Todo.findById(todoId)
    const subtask = todo.subtasks.id(subtaskId)

    subtask.isComplete = true
    await todo.save()

    console.log('Updated document: ', todo)
}

// find parent from subdoc
const findParentAndRemoveSubtask = async () => {
    const todo = await Todo.findOne({
        'subtasks.text': 'Learn how props work'
    })

    const subtask = todo.subtasks.find((subTask) => {
        return subTask.text === 'Learn how props work'
    })

    subtask.deleteOne()

    await todo.save()
    console.log('Updated todo: ', todo)
}

const createUser = async () => {
    const userData = {
        name: 'Alex',
        email: 'alex@email.com'
    }

    const user = await User.create(userData)
    console.log('New user: ', user)

}

const assignTodo = async () => {
    const todoId = '6715f772c795ab2d1780d210'
    const userId = '67162881ce9c18d9f53350a7'

    const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        { assignee : userId },
        { new: true }
    )

    console.log('Updated document: ', updatedTodo)
}

// user id = 67162881ce9c18d9f53350a7
// todo id = 6715f772c795ab2d1780d210

/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
    console.log('Queries running')
    // await createTodo()
    // await findTodos()
    // await createSubtask()
    // await findSubtask()
    // await removeSubtask()
    // await updateSubtask()
    // await findParentAndRemoveSubtask()
    // await createUser()
    // await assignTodo()
}