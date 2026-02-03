import type {
  CreateTasksArgs,
  DeleteTasksArgs,
  DomainTask,
  GetTasksResponse,
  UpdateTaskArgs,
} from "@/features/todolists/api/tasksApi.types.ts"
import type { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"
import { PAGE_SIZE } from "@/common/constants"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => {
        return {
          method: "GET",
          url: `/todo-lists/${todolistId}/tasks`,
          params: { ...params, count: PAGE_SIZE },
        }
      },
      providesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, CreateTasksArgs>({
      query: (arg: CreateTasksArgs) => ({
        method: "POST",
        url: `/todo-lists/${arg.todolistId}/tasks`,
        body: { title: arg.title },
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: builder.mutation<BaseResponse<{ item: DomainTask }>, UpdateTaskArgs>({
      query: (arg: UpdateTaskArgs) => ({
        method: "PUT",
        url: `/todo-lists/${arg.todolistId}/tasks/${arg.taskId}`,
        body: arg.model,
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    deleteTask: builder.mutation<BaseResponse<{ item: DomainTask }>, DeleteTasksArgs>({
      query: (arg: DeleteTasksArgs) => ({
        method: "DELETE",
        url: `/todo-lists/${arg.todolistId}/tasks/${arg.taskId}`,
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi
