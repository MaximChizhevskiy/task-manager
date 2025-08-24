import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useAppDispatch, useAppSelector } from "@/common"
import { useEffect } from "react"
import { setTodolistsAC } from "@/features/todolists/model/todolists-slice.ts"
import { todolistApi } from "@/features/todolists/api/todolistApi.ts"
import { selectTodolists } from "@/features/todolists/model/todolists-selectors.ts"

export const Todolists = () => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(selectTodolists)

  useEffect(() => {
    todolistApi.getTodolists().then((res) => {
      const todolists = res.data
      dispatch(setTodolistsAC({ todolists }))
    })
  }, [])

  return (
    <>
      {todolists.map((todolist) => {
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
