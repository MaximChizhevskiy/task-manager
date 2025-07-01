import { instance } from "@/common"
import type { GetTasksResponse, Task, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import type { BaseResponse } from "@/common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}
