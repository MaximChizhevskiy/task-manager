import type { TodolistType } from "@/features/todolists/api/todolistApi.types.ts"
import type { BaseResponse } from "@/common/types"
import { instance } from "@/common"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { baseApi } from "@/app/baseApi.ts"

export const _todolistApi = {
  getTodolists() {
    return instance.get<TodolistType[]>("/todo-lists")
  },
  createTodolists(title: string) {
    return instance.post<BaseResponse<{ item: TodolistType }>>("/todo-lists", { title })
  },
  deleteTodolists(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
  changeTodolistTitle(id: string, title: string) {
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
}

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
