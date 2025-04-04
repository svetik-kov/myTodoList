import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {CreateItemForm} from './CreateItemForm'
import {TodolistItem} from './TodolistItem'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TasksState = Record<string, Task[]>

export const App = () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist))
  }

  const createTodolist = (title: string) => {
    const todolistId = v1()
    const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasks, [todolistId]: [] })
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, title } : todolist))
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
  }

  const createTask = (todolistId: string, title: string) => {
    const newTask = {id: v1(), title, isDone: false}
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? { ...task, isDone } : task)})
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title } : task)})
  }

  return (
      <div className="app">
        <AppBar position="static" sx={{ mb: '30px' }}>
          <Toolbar>
            <Container maxWidth={'lg'}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Button color="inherit">Sign in</Button>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth={'lg'}>
          <Grid container sx={{ mb: '30px' }}>
        <CreateItemForm onCreateItem={createTodolist}/>
          </Grid>
          <Grid container spacing={4}>
        {todolists.map(todolist => {
          const todolistTasks = tasks[todolist.id]
          let filteredTasks = todolistTasks
          if (todolist.filter === 'active') {
            filteredTasks = todolistTasks.filter(task => !task.isDone)
          }
          if (todolist.filter === 'completed') {
            filteredTasks = todolistTasks.filter(task => task.isDone)
          }

          return (
              <Grid key={todolist.id}>
                <Paper sx={{ p: '0 20px 20px 20px' }}>
              <TodolistItem key={todolist.id}
                            todolist={todolist}
                            tasks={filteredTasks}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            createTask={createTask}
                            changeTaskStatus={changeTaskStatus}
                            deleteTodolist={deleteTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}/>
                </Paper>
              </Grid>
          )
        })}
          </Grid>
        </Container>
      </div>
  )
}
