import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"

export const Todolists = () => {
  /*const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()*/

  const { data: todolists, refetch } = useGetTodolistsQuery()

  /*useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])*/

  return (
    <>
      <div>
        <button onClick={refetch}>Получить свежие данные</button>
      </div>
      {todolists?.map((todolist) => {
        return (
          <Grid key={todolist.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem key={todolist.id} todolist={todolist} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
