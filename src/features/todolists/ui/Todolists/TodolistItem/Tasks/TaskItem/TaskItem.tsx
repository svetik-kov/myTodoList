import type { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import { Checkbox } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"
import { createTaskModel } from "@/features/todolists/lib/utils"
import { DomainTodolist } from "@/features/todolists/lib/types"

type Props = {
  task: DomainTask
  //todolistId: string
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [updateTask] = useUpdateTaskMutation()
  const [removeTask] = useRemoveTaskMutation()

  const deleteTask = () => {
    removeTask({ todolistId: todolist.id, taskId: task.id })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = createTaskModel(task, { status })
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const changeTaskTitle = (title: string) => {
    const model = createTaskModel(task, { title })
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const isTaskCompleted = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox
          checked={isTaskCompleted}
          onChange={changeTaskStatus}
          disabled={todolist.entityStatus === "loading"}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={todolist.entityStatus === "loading"} />
      </div>
      <IconButton onClick={deleteTask} disabled={todolist.entityStatus === "loading"}>
        <span>{new Date(task.addedDate).toLocaleDateString()}</span>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
