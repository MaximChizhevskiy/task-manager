import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "./TodolistTitle.module.css"
import { type DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { useChangeTodolistTitleMutation, useDeleteTodolistsMutation } from "@/features/todolists/api/_todolistApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const [deleteTodolist] = useDeleteTodolistsMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ id, title })
  }

  return (
    <div className={styles.todolistTitleContainer}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} entityStatus={entityStatus} />
      </h3>
      <IconButton aria-label={"delete"} onClick={deleteTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
