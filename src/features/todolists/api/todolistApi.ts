import type { TodolistType } from "@/features/todolists/api/todolistApi.types.ts"
import type { BaseResponse } from "@/common/types"
import { instance } from "@/common"

export const todolistApi = {
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
