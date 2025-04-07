import type {TasksState} from '../app/App.tsx'
import {createReducer, nanoid} from '@reduxjs/toolkit'
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts';

const initialState: TasksState = {}

export const _tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist':{
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist':{
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case 'delete_task':{
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        }
        case 'create_task':{
            const newTask = {id:nanoid(), title:action.payload.title, isDone: false}
          return   {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case 'create_task_status':{
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id == action.payload.taskId ? {...task, isDone:action.payload.isDone} : task)}
        }
        case 'create_task_title':{
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id == action.payload.taskId ? {...task, title:action.payload.title} : task)}
        }
        default:
            return state
    }
}

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
})

export const deleteTaskAC=(payload:{todolistId: string, taskId: string})=>{
    return {type: 'delete_task', payload} as const
}
export const createTaskAC=(payload:{todolistId: string, title: string})=>{
    return {type: 'create_task', payload} as const
}
export const changeTaskStatusAC=(payload:{todolistId: string, taskId: string, isDone: boolean})=>{
    return {type: 'create_task_status', payload} as const
}
export const changeTaskTitleAC=(payload:{todolistId: string, taskId: string, title: string})=>{
    return {type: 'create_task_title', payload} as const
}


export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type CreateTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type CreateTaskTitleAction = ReturnType<typeof changeTaskTitleAC>
type Actions = any | DeleteTaskAction |CreateTaskAction | CreateTaskStatusAction |CreateTaskTitleAction