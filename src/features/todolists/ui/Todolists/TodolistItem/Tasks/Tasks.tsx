import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { TaskStatus } from "@/common/enums"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
  const { todolist } = props

  const { id, filter } = todolist
  const { data, isLoading } = useGetTasksQuery(id)

  /* useEffect(() => {
     dispatch(fetchTasksTC(todolist.id))
   }, [])*/
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
