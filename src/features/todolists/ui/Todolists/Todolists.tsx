import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useAppDispatch, useAppSelector } from "@/common"
import { useEffect } from "react"
import { selectTodolists, fetchTodolists } from "@/features/todolists/model/todolists-slice.ts"

export const Todolists = () => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(selectTodolists)

  useEffect(() => {
    dispatch(fetchTodolists())
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
