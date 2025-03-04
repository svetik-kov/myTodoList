import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValues = 'all' | 'active' | 'completed'


export const App = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValues>('all')

    const createTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }
    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter((task: Task) => task.id !== taskId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map((task: Task) => task.id === taskId ? {...task, isDone} : task))
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone === true)
    }

    return (
        <div className="app">
            <TodolistItem
                title="What to learn"
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                filter={filter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
            />

        </div>
    )
}


