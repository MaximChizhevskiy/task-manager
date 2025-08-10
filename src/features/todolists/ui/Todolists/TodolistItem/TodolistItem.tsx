import type { Todolist } from "@/app/App.tsx"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx"
import { useAppDispatch } from "@/common"
import { createTaskAC } from "@/features/todolists/model/tasks-slice.ts"

export type Task = {
  taskId: string
  taskTitle: string
  isDone: boolean
}

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const { todolistId } = todolist

  const dispatch = useAppDispatch()

  const createTask = (taskTitle: string) => {
    dispatch(createTaskAC({ todolistId, taskTitle }))
  }

  return (
    <div className={"todo-item"}>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
