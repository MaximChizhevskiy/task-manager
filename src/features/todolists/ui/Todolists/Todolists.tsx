import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { selectTodolists } from "@/features/todolists/model/todolists-selectors.ts"
import { useAppSelector } from "@/common"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  return (
    <>
      {todolists.map((todolist) => {
        return (
          <Grid key={todolist.todolistId}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem key={todolist.todolistId} todolist={todolist} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
