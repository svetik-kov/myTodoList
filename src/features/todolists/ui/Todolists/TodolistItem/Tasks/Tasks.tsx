import List from "@mui/material/List"
import { fetchTasksTC, selectTasks } from "@/features/todolists/model/tasks-slice.ts"

import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks"
import { useEffect } from "react"
import { TaskStatus } from "@/common/enums"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
  const { todolist } = props
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  const todolistTasks = tasks[todolist.id]
  let filteredTasks = todolistTasks
  if (todolist.filter === "active") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New)
  }
  if (todolist.filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task: DomainTask) => (
            <TaskItem key={task.id} task={task} /*todolistId={id}*/ todolist={todolist} />
          ))}
        </List>
      )}
    </>
  )
}
