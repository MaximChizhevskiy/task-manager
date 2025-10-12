import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts"
import { useAppDispatch } from "@/common"
import { deleteTask, updateTask } from "@/features/todolists/model/tasks-slice.ts"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItem = ({ todolist, task }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(deleteTask({ todolistId: todolist.id, taskId: task.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTask({ todolistId: todolist.id, taskId: task.id, domainModel: { status } }))
  }

  const changeTaskTitleHandler = (newTitle: string) => {
    dispatch(updateTask({ todolistId: todolist.id, taskId: task.id, domainModel: { title: newTitle } }))
  }

  const isTaskCompleted = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox
          checked={isTaskCompleted}
          onChange={changeTaskStatusHandler}
          disabled={todolist.entityStatus === "loading"}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} entityStatus={todolist.entityStatus} />
      </div>
      <IconButton onClick={deleteTaskHandler} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
