import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistApi.ts"
import { TodolistSkeleton } from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"
import Box from "@mui/material/Box"
import { containerSx } from "@/common"
import type { DomainTodolist } from "@/features/todolists/lib/types"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery(undefined, {
    pollingInterval: 30000,
    skipPollingIfUnfocused: true,
  })

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {todolists?.map((todolist: DomainTodolist) => {
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
