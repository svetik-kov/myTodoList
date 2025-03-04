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
}
export const TodolistItem = ({tasks, title, deleteTask, changeFilter, createTask}: Props) => {
    //const inputRef = useRef<HTMLInputElement>(null)
    const [taskTitle, setTaskTitle] = useState('')

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
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
                    <input value={taskTitle}
                           onChange={changeTaskTitleHandler}
                           onKeyDown={createTaskOnEnterHandler}/>
                    <Button title={'+'}
                            onClick={createTaskHandler}/>
                </div>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {tasks.map(task => {

                            const deleteTaskHandler = () => {
                                deleteTask(task.id)
                            }
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button onClick={deleteTaskHandler} title={'x'}/>
                                </li>
                            )
                        })}
                    </ul>
                )}


                <div>
                    <Button onClick={() => changeFilter('all')} title={'All'}/>
                    <Button onClick={() => changeFilter('active')} title={'Active'}/>
                    <Button onClick={() => changeFilter('completed')} title={'Completed'}/>
                </div>
            </div>
        </div>
    )
        ;
};
