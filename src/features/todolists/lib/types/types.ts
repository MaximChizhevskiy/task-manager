import type { TodolistType } from "@/features/todolists/api/todolistApi.types.ts"
import type { RequestStatusLoading } from "@/common/types"

export type DomainTodolist = TodolistType & {
  filter: FilterValues
  entityStatus: RequestStatusLoading
}

export type FilterValues = "all" | "active" | "completed"
