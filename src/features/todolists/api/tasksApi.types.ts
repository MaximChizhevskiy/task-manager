import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"
import { z } from "zod"

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  deadline: z.string().nullable(),
  startDate: z.string().nullable(),
  title: z.string(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.iso.datetime({ local: true }),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
})

export type DomainTask = z.infer<typeof domainTaskSchema>

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
