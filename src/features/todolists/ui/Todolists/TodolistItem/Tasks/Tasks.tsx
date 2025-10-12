import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { useAppDispatch, useAppSelector } from "@/common"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { fetchTasks, selectTasks } from "@/features/todolists/model/tasks-slice.ts"
import { useEffect } from "react"
import { TaskStatus } from "@/common/enums/enums.ts"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)

  useEffect(() => {
    dispatch(fetchTasks({ todolistId: id }))
  }, [])

  const todolistTasks = tasks[id]

  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((t) => t.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((t) => t.status === TaskStatus.Completed)
  }
  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => {
            return <TaskItem key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
