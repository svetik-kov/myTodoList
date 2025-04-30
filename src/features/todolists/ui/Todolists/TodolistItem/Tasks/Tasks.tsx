import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"

import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton"
import { useState } from "react"
import { DomainTodolist } from "@/features/todolists/lib/types"
import { TasksPagination } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
  const { todolist } = props
  const { id, filter } = todolist
  const [page, setPage] = useState(1)
  const { data, currentData, isLoading, isFetching } = useGetTasksQuery({ todolistId: id, params: { page } })
  //const dispatch = useAppDispatch()

  console.log({ isLoading, isFetching })
  console.log({ data, currentData })

  /* useEffect(() => {
     if (!error) return
     if ("status" in error) {
       // FetchBaseQueryError
       const errMsg = "error" in error ? error.error : JSON.stringify(error.data)
       dispatch(setAppErrorAC({ error: errMsg }))
     } else {
       // SerializedError
       dispatch(setAppErrorAC({ error: error.message || "Some error occurred" }))
     }
   }, [error])*/

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
        /* <List>
           {filteredTasks?.map((task: DomainTask) => (
             <TaskItem key={task.id} task={task} /!*todolistId={id}*!/ todolist={todolist} />
           ))}
         </List>*/
        <>
          <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}</List>
          <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
