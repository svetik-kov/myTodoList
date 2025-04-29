import { DomainTodolist, FilterValues } from "@/features/todolists/model/todolists-slice.ts"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { containerSx } from "@/common/styles/container.styles.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  /* const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id, filter }))
  }*/

  const changeFilter = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData(
        // название эндпоинта, в котором нужно обновить кэш
        "getTodolists",
        // аргументы для эндпоинта
        undefined,
        // `updateRecipe` - коллбэк для обновления закэшированного стейта мутабельным образом
        (state) => {
          const todolist = state.find((todolist) => todolist.id === id)
          if (todolist) {
            todolist.filter = filter
          }
        },
      ),
    )
  }

  return (
    <Box sx={containerSx}>
      <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"} onClick={() => changeFilter("all")}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
