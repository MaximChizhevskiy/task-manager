import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import type { Task } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts"
import { useAppDispatch } from "@/common"
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC } from "@/features/todolists/model/tasks-slice.ts"

type Props = {
  task: Task
  todolistId: string
}
export const TaskItem = ({ todolistId, task }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(deleteTaskAC({ todolistId, taskId: task.taskId }))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTaskStatusAC({
        todolistId,
        taskId: task.taskId,
        isDone: e.currentTarget.checked,
      }),
    )
  }
  const changeTaskTitle = (newTitle: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.taskId, taskTitle: newTitle }))
  }
  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.taskTitle} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
