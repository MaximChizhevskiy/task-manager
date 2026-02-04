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
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")

        let patchResult: any[] = []
        cachedArgsForQuery.forEach(({ params }) => {
          patchResult.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, params: { page: params.page } }, (state) => {
                const index = state.items.findIndex((task) => task.id === taskId)
                if (index !== -1) {
                  state.items[index] = { ...state.items[index], ...model }
                }
              }),
            ),
          )
        })
        try {
          await queryFulfilled
        } catch {
          patchResult.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
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
