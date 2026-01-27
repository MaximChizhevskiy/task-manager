import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { TaskStatus } from "@/common/enums/enums.ts"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"
import type { DomainTodolist } from "@/features/todolists/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const { data, isLoading } = useGetTasksQuery(id)

  if (isLoading) {
    return <TasksSkeleton />
  }
  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.Completed)
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
