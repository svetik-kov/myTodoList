import {FilterValues, Task, Todolist} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent} from 'react';
import {CreateItemForm} from './CreateItemForm.tsx';
import {EditableSpan} from './EditableSpan.tsx';

type Props = {
    todolist: Todolist
    tasks: Task[]
    date?: string,
    deleteTask: (todolistId: string, id: string) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}
export const TodolistItem = ({
                                 tasks,
                                 todolist: {filter, title, id},
                                 deleteTask,
                                 changeTaskStatus,
                                 changeFilter,
                                 createTask,
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodolistTitle
                             }: Props) => {
    //const inputRef = useRef<HTMLInputElement>(null)


    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }
    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    return (
        <div>
            <div>
                <div className={'container'}>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
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
                <CreateItemForm onCreateItem={createTaskHandler}/>

                {tasks?.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {tasks?.map(task => {
                            const changeTaskTitleHandler = (title: string) => {
                                changeTaskTitle(id, task.id, title)
                            }
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
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}  />
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
