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
          return { ...tl, filter: "all" }
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
      async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistApi.util.updateQueryData("getTodolists", undefined, (state) => {
            const index = state.findIndex((todolist) => todolist.id === id)
            if (index !== -1) {
              state.splice(index, 1)
            }
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
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
