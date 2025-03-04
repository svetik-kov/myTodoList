import {FilterValues, Task} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
    title: string
    tasks: Task[]
    date?: string,
    deleteTask: (id: string) => void
    changeFilter: (filter: FilterValues) => void
    filter: FilterValues
    createTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const TodolistItem = ({tasks,filter, title, deleteTask, changeTaskStatus, changeFilter, createTask}: Props) => {
    //const inputRef = useRef<HTMLInputElement>(null)
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
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


    return (
        <div>
            <div>
                <h3>{title}</h3>
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
                                deleteTask(task.id)
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue)
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
                            onClick={() => changeFilter('all')}/>
                    <Button className={filter === 'active' ? 'active-filter' : ''}
                            title={'Active'}
                            onClick={() => changeFilter('active')}/>
                    <Button className={filter === 'completed' ? 'active-filter' : ''}
                            title={'Completed'}
                            onClick={() => changeFilter('completed')}/>
                </div>
            </div>
        </div>
    )
        ;
};
