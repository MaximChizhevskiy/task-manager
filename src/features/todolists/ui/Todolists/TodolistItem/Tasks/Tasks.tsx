import { selectTasks } from "@/features/todolists/model/tasks-selectors.ts"
import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { useAppSelector } from "@/common"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const tasks = useAppSelector(selectTasks)

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
      {todolistTasks && todolistTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks &&
            filteredTasks.map((task) => {
              return <TaskItem key={task.taskId} task={task} todolistId={id} />
            })}
        </List>
      )}
    </>
  )
}
