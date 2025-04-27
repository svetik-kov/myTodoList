import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"
import { useState } from "react"

export const Todolists = () => {
  /*const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()*/
  const [skip, setSkip] = useState(true)
  const { data: todolists } = useGetTodolistsQuery(undefined, { skip })

  /*useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])*/

  const fetchTodolists = () => {
    setSkip(false)
  }

  return (
    <>
      <div>
        <button onClick={fetchTodolists}>Download todolists</button>
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
