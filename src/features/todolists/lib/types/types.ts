import type { TodolistType } from "@/features/todolists/api/todolistApi.types.ts"

export type DomainTodolist = TodolistType & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
