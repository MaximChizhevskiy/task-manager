import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import type { Todolist } from "@/app/App.tsx"
import styles from "./TodolistTitle.module.css"
import { useAppDispatch } from "@/common"
import { changeTodolistTitleAC, deleteTodolistAC } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: Todolist
}
export const TodolistTitle = ({ todolist }: Props) => {
  const { todolistId, todolistTitle } = todolist

  const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    const action = deleteTodolistAC({ todolistId })
    dispatch(action)
  }
  const changeTodolistTitle = (todolistTitle: string) => {
    dispatch(changeTodolistTitleAC({ todolistId, todolistTitle }))
  }

  return (
    <div className={styles.todolistTitleContainer}>
      <h3>
        <EditableSpan value={todolistTitle} onChange={changeTodolistTitle} />
      </h3>
      <IconButton aria-label={"delete"} onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
