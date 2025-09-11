import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { useAppSelector } from "@/common"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { selectTasks } from "@/features/todolists/model/tasks-slice.ts"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const tasks = useAppSelector(selectTasks)
  console.log(tasks)
  const todolistTasks = tasks[id]

  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((t) => !t.isDone)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((t) => t.isDone)
  }
  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => {
            return <TaskItem key={task.taskId} task={task} todolistId={id} />
          })}
        </List>
      )}
    </>
  )
}
