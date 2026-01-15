import Grid from "@mui/material/Grid"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import Container from "@mui/material/Container"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { useAppSelector } from "@/common"
import { Navigate } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"
import { useCreateTodolistsMutation } from "@/features/todolists/api/_todolistApi.ts"
import { selectIsLoggedIn } from "@/app/app-slice.ts"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  const [createTodolist] = useCreateTodolistsMutation()

  const createTodolistHandler = (todolistTitle: string) => {
    createTodolist(todolistTitle)
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
