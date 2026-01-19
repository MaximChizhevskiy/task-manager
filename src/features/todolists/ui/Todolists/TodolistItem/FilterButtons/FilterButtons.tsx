import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import type { FilterValues } from "@/app/App.tsx"
import { containerSx, useAppDispatch } from "@/common"
import { type DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { todolistApi } from "@/features/todolists/api/_todolistApi.ts"

type Props = {
  todolist: DomainTodolist
}
export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(
      todolistApi.util.updateQueryData("getTodolists", undefined, (todolists) => {
        const todolist = todolists.find((t) => t.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      }),
    )
    //dispatch(changeTodolistFilterAC({ todolistId: id, filter }))
  }

  return (
    <Box sx={containerSx}>
      <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"} onClick={() => changeFilter("all")}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
