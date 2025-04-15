import List from "@mui/material/List"
import { selectTasks, Task } from "@/features/todolists/model/tasks-slice.ts"

import { Todolist } from "@/features/todolists/model/todolists-slice.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"

type Props = {
  todolist: Todolist
}

export const Tasks = (props: Props) => {
  const {
    todolist: { id, filter },
  } = props
  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task: Task) => !task.isDone)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task: Task) => task.isDone)
  }

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} todolistId={id} />
          ))}
        </List>
      )}
    </>
  )
}
