import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "./TodolistTitle.module.css"
import {
  todolistApi,
  useChangeTodolistTitleMutation,
  useDeleteTodolistsMutation,
} from "@/features/todolists/api/todolistApi.ts"
import { useAppDispatch } from "@/common"
import type { RequestStatusLoading } from "@/common/types"
import type { DomainTodolist } from "@/features/todolists/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const [deleteTodolist] = useDeleteTodolistsMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()

  const changeTodolistStatus = (entityStatus: RequestStatusLoading) => {
    dispatch(
      todolistApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((t) => t.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
  }

  const deleteTodolistHandler = () => {
    changeTodolistStatus("loading")
    deleteTodolist(id)
      .unwrap()
      .catch(() => {
        changeTodolistStatus("idle")
      })
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
