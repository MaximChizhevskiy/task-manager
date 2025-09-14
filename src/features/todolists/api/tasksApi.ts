import { instance } from "@/common"
import type {
  GetTasksResponse,
  DomainTask,
  UpdateTaskModel,
  CreateTasksArgs,
  DeleteTasksArgs,
} from "@/features/todolists/api/tasksApi.types.ts"
import type { BaseResponse } from "@/common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(arg: CreateTasksArgs) {
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${arg.todolistId}/tasks`, {
      title: arg.title,
    })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(arg: DeleteTasksArgs) {
    return instance.delete<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
  },
}
