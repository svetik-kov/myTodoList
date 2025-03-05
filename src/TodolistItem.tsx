import {FilterValues, Task, Todolist} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
    todolist: Todolist
    tasks: Task[]
    date?: string,
    deleteTask: (todolistId: string, id: string) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    deleteTodolist: (todolistId: string) => void
}
export const TodolistItem = ({
                                 tasks,
                                 todolist: {filter, title, id},
                                 deleteTask,
                                 changeTaskStatus,
                                 changeFilter,
                                 createTask,
                                 deleteTodolist
                             }: Props) => {
    //const inputRef = useRef<HTMLInputElement>(null)
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(id, trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }
    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }
    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    return (
        <div>
            <div>
                <div className={'container'}>
                    <h3>{title}</h3>
                    <Button title={'x'} onClick={deleteTodolistHandler}/>
                </div>
                {/*<div>
                    <input ref={inputRef}/>
                    <Button title={'+'} onClick={() => {
                        if (inputRef.current) {
                            createTask(inputRef.current.value)
                            inputRef.current.value=''
                        }
                    }}/>
                </div>*/}
                <div>
                    <input className={error ? 'error' : ''}
                           value={taskTitle}
                           onChange={changeTaskTitleHandler}
                           onKeyDown={createTaskOnEnterHandler}/>
                    <Button title={'+'}
                            onClick={createTaskHandler}/>
                    {error && <div className={'error-message'}>{error}</div>}
                </div>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {tasks.map(task => {

                            const deleteTaskHandler = () => {
                                deleteTask(id, task.id)
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(id, task.id, newStatusValue)
                            }
                            return (
                                <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                                    <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <span>{task.title}</span>
                                    <Button onClick={deleteTaskHandler} title={'x'}/>
                                </li>
                            )
                        })}
                    </ul>
                )}


                <div>
                    <Button className={filter === 'all' ? 'active-filter' : ''}
                            title={'All'}
                            onClick={() => changeFilter(id, 'all')}/>
                    <Button className={filter === 'active' ? 'active-filter' : ''}
                            title={'Active'}
                            onClick={() => changeFilter(id, 'active')}/>
                    <Button className={filter === 'completed' ? 'active-filter' : ''}
                            title={'Completed'}
                            onClick={() => changeFilter(id, 'completed')}/>
                </div>
            </div>
        </div>
    )
        ;
};
