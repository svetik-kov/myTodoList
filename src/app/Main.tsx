import Grid from "@mui/material/Grid2"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import Container from "@mui/material/Container"

import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { createTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { Navigate } from "react-router"
import { useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"
import { Path } from "@/common/routing/Routing.tsx"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  const createTodolist = (title: string) => {
    dispatch(createTodolistTC(title))
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
