import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts"
import type { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"
import type { DomainTodolist } from "@/features/todolists/lib/types"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItem = ({ todolist, task }: Props) => {
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const deleteTaskHandler = () => {
    deleteTask({ todolistId: todolist.id, taskId: task.id })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    updateTask({ todolistId: todolist.id, taskId: task.id, model })
    console.log("model: ", model)
  }

  const changeTaskTitleHandler = (newTitle: string) => {
    const model: UpdateTaskModel = {
      title: newTitle,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    updateTask({ todolistId: todolist.id, taskId: task.id, model })
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
