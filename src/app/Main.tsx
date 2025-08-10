import Grid from "@mui/material/Grid"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import Container from "@mui/material/Container"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { useAppDispatch } from "@/common"
import { createTodolistAC } from "@/features/todolists/model/todolists-slice.ts"

export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (todolistTitle: string) => {
    const action = createTodolistAC(todolistTitle)
    dispatch(action)
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
