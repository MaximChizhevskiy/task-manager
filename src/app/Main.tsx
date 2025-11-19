import Grid from "@mui/material/Grid"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import Container from "@mui/material/Container"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { useAppDispatch, useAppSelector } from "@/common"
import { createTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { Navigate } from "react-router"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"
import { Path } from "@/common/routing/Routing.tsx"

export const Main = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const createTodolistHandler = (todolistTitle: string) => {
    dispatch(createTodolist({ todolistTitle }))
  }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolistHandler} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
