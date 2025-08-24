import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "./TodolistTitle.module.css"
import { useAppDispatch } from "@/common"
import {
  changeTodolistTitleAC,
  deleteTodolistAC,
  type DomainTodolist,
} from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: DomainTodolist
}
export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    const action = deleteTodolistAC({ todolistId: id })
    dispatch(action)
  }
  const changeTodolistTitle = (todolistTitle: string) => {
    dispatch(changeTodolistTitleAC({ todolistId: id, todolistTitle }))
  }

  return (
    <div className={styles.todolistTitleContainer}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton aria-label={"delete"} onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
