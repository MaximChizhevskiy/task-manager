import { TaskPriority, type TaskStatus } from "@/common/enums/enums.ts"

export type Task = {
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
  items: Task[]
}

export type UpdateTaskModel = {
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
