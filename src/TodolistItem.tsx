import {FilterValues, Task} from './App.tsx';
import {Button} from './Button.tsx';

type Props = {
    title: string
    tasks: Task[]
    date?: string,
    deleteTask: (id: number) => void
    changeFilter:(filter:FilterValues)=>void
    filter:FilterValues
}
export const TodolistItem = ({tasks, title, deleteTask,changeFilter}: Props) => {

    return (
        <div>
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <Button title={'+'}/>

                </div>

                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button onClick={() => deleteTask(task.id)} title={'x'}/>
                                </li>
                            )
                        })}
                    </ul>
                )}


                <div>
                    <Button onClick={  ()=>changeFilter('all') } title={'All'}/>
                    <Button onClick={  ()=>changeFilter('active')} title={'Active'}/>
                    <Button onClick={  ()=>changeFilter('completed') } title={'Completed'}/>
                </div>
            </div>
        </div>
    );
};
