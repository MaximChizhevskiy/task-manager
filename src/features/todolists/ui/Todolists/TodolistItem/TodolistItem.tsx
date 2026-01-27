import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx"
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi.ts"
import type { DomainTodolist } from "@/features/todolists/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const { id, entityStatus } = todolist
  const [createTask] = useCreateTaskMutation()

  const createTaskHandler = (title: string) => {
    createTask({ todolistId: id, title })
  }

  return (
    <div className={"todo-item"}>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} disabled={entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
