import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import type { FilterValues, Todolist } from "@/app/App.tsx"
import { containerSx, useAppDispatch } from "@/common"
import { changeTodolistFilterAC } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: Todolist
}
export const FilterButtons = ({ todolist }: Props) => {
  const { todolistId, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ todolistId, filter }))
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
