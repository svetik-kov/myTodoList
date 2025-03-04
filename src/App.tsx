import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';

export type Task = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValues = 'all' | 'active' | 'completed'


export const App = () => {
   const [tasks,setTasks]=useState<Task[]>([
       { id: 1, title: 'HTML&CSS', isDone: true },
       { id: 2, title: 'JS', isDone: true },
       { id: 3, title: 'ReactJS', isDone: false },
   ])
    const [filter, setFilter] = useState<FilterValues>('all')


const changeFilter=(filter:FilterValues)=>{
       setFilter(filter)
}
    const deleteTask=(taskId:number)=>{
        setTasks(tasks.filter((task:Task)=>task.id!==taskId))
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
                changeFilter={ changeFilter}
                filter={filter}
            />

        </div>
    )
}


