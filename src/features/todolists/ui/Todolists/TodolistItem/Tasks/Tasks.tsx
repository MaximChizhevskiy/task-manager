import { selectTasks } from "@/features/todolists/model/tasks-selectors.ts"
import type { Todolist } from "@/app/App.tsx"
import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { useAppSelector } from "@/common"

type Props = {
  todolist: Todolist
}

export const Tasks = ({ todolist }: Props) => {
  const { todolistId, filter } = todolist
  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[todolistId]
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((t) => !t.isDone)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((t) => t.isDone)
  }

  return (
    <>
      {todolistTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map((task) => {
            return <TaskItem key={task.taskId} task={task} todolistId={todolistId} />
          })}
        </List>
      )}
    </>
  )
}
