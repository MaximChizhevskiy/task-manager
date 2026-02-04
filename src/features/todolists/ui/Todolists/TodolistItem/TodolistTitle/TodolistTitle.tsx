import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "./TodolistTitle.module.css"
import { useChangeTodolistTitleMutation, useDeleteTodolistsMutation } from "@/features/todolists/api/todolistApi.ts"
import type { DomainTodolist } from "@/features/todolists/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

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
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton aria-label={"delete"} onClick={deleteTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
