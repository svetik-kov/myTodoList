import styles from "./TodolistTitle.module.css"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "@/features/todolists/api/todolistsApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  // const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    // dispatch(deleteTodolistTC(id))
    removeTodolist(id)
  }

  const changeTodolistTitle = (title: string) => {
    //dispatch(changeTodolistTitleAC({ id, title }))
    //dispatch(changeTodolistTitleTC({ id, title }))
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
