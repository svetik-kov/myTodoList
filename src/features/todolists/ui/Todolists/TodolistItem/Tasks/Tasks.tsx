import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"

import { TaskStatus } from "@/common/enums"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton"
import { useAppDispatch } from "@/common/hooks"
import { useEffect } from "react"
import { setAppErrorAC } from "@/app/app-slice.ts"
import { DomainTodolist } from "@/features/todolists/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
  const { todolist } = props
  const { id, filter } = todolist
  const { data, isLoading, error } = useGetTasksQuery(id)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!error) return
    if ("status" in error) {
      // FetchBaseQueryError
      const errMsg = "error" in error ? error.error : JSON.stringify(error.data)
      dispatch(setAppErrorAC({ error: errMsg }))
    } else {
      // SerializedError
      dispatch(setAppErrorAC({ error: error.message || "Some error occurred" }))
    }
  }, [error])

  if (isLoading) {
    return <TasksSkeleton />
  }
  //const todolistTasks = tasks[todolist.id]
  const todolistTasks = data?.items
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks?.filter((task) => task.status === TaskStatus.Completed)
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
