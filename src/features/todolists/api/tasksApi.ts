import { instance } from "@/common"
import type {
  CreateTasksArgs,
  DeleteTasksArgs,
  DomainTask,
  GetTasksResponse,
  UpdateTaskArgs,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts"
import type { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"

export const _tasksApi = {
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

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => ({
        method: "GET",
        url: `/todo-lists/${todolistId}/tasks`,
      }),
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, CreateTasksArgs>({
      query: (arg: CreateTasksArgs) => ({
        method: "POST",
        url: `/todo-lists/${arg.todolistId}/tasks`,
        body: { title: arg.title },
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<BaseResponse<{ item: DomainTask }>, UpdateTaskArgs>({
      query: (arg: UpdateTaskArgs) => ({
        method: "PUT",
        url: `/todo-lists/${arg.todolistId}/tasks/${arg.taskId}`,
        body: arg.model,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<BaseResponse<{ item: DomainTask }>, DeleteTasksArgs>({
      query: (arg: DeleteTasksArgs) => ({
        method: "DELETE",
        url: `/todo-lists/${arg.todolistId}/tasks/${arg.taskId}`,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi
