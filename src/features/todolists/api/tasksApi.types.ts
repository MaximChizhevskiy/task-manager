import { TaskPriority, type TaskStatus } from "@/common/enums/enums.ts"

export type DomainTask = {
  id: string
  title: string
  status: TaskStatus
  description: string | null
  deadline: string | null
  todoListId: string
  order: string
  addedDate: string
  startDate: string | null
  priority: TaskPriority
}

export type GetTasksResponse = {
  totalCount: number
  error: string | null
  items: DomainTask[]
}

export type UpdateTaskModel = {
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}

export type DeleteTasksArgs = {
  todolistId: string
  taskId: string
}

export type CreateTasksArgs = {
  todolistId: string
  title: string
}
