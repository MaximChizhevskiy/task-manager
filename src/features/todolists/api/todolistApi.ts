import type { TodolistType } from "@/features/todolists/api/todolistApi.types.ts"
import type { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"
import type { DomainTodolist } from "@/features/todolists/lib/types"

export const todolistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: TodolistType[]) => {
        return todolists.map((tl) => {
          return { ...tl, filter: "all", entityStatus: "idle" }
        })
      },
      providesTags: ["Todolist"],
    }),
    createTodolists: builder.mutation<BaseResponse<{ item: TodolistType }>, string>({
      query: (title) => ({
        method: "POST",
        url: "/todo-lists",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolists: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        method: "DELETE",
        url: `/todo-lists/${id}`,
      }),
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ title, id }) => ({
        method: "PUT",
        url: `/todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistsMutation,
  useDeleteTodolistsMutation,
  useChangeTodolistTitleMutation,
} = todolistApi
