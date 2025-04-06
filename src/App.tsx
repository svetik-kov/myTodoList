import './App.css'
import {useReducer, useState} from 'react'
import {CreateItemForm} from './CreateItemForm'
import {TodolistItem} from './TodolistItem'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {containerSx} from './TodolistItem.styles.ts';
import {NavButton} from './NavButton.ts';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from './model/todolists-reducer.ts';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from './model/tasks-reducer.ts';

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
type ThemeMode = 'dark' | 'light'

export const App = () => {
    /*  const todolistId1 = v1()
      const todolistId2 = v1()


      const [todolists, dispatchToTodolists] = useState<Todolist[]>([
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
      ])

      const [tasks, dispatchToTasks] = useState<TasksState>({
        [todolistId1]: [
          { id: v1(), title: 'HTML&CSS', isDone: true },
          { id: v1(), title: 'JS', isDone: true },
          { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
          { id: v1(), title: 'Rest API', isDone: true },
          { id: v1(), title: 'GraphQL', isDone: false },
        ],
      })*/

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})
    //const [tasks, dispatchToTasks] = useState<TasksState>({})

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const createTodolist = (title: string) => {
        /* const todolistId = v1()
         const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}*/
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const deleteTodolist = (todolistId: string) => {
        const action=deleteTodolistAC(todolistId)
        dispatchToTodolists( action)
        dispatchToTasks( action)
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id: todolistId, title}))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(deleteTaskAC({taskId, todolistId}))
    }

    const createTask = (todolistId: string, title: string) => {
        dispatchToTasks(createTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC({todolistId, taskId, title}))
    }

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
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
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
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
            </ThemeProvider>
        </div>
    )
}
