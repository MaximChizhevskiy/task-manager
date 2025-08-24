import type { FilterValues } from "@/app/App.tsx"
import { createSlice, nanoid } from "@reduxjs/toolkit"
import type { TodolistType } from "@/features/todolists/api/todolistApi.types.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      setTodolistsAC: create.reducer<{ todolists: TodolistType[] }>((state, action) => {
        action.payload.todolists.forEach((t) => {
          state.push({ ...t, filter: "all" })
        })
      }),
      deleteTodolistAC: create.reducer<{ todolistId: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
        if (index !== -1) {
          state.splice(index, 1)
        }
      }),
      changeTodolistTitleAC: create.reducer<{ todolistId: string; todolistTitle: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
        if (index !== -1) {
          state[index].title = action.payload.todolistTitle
        }
      }),
      changeTodolistFilterAC: create.reducer<{ todolistId: string; filter: FilterValues }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      }),

      createTodolistAC: create.preparedReducer(
        (todolistTitle: string) => {
          return { payload: { todolistTitle, todolistId: nanoid() } }
        },
        (state, action) => {
          const { todolistId, todolistTitle } = action.payload
          const newTodolist: DomainTodolist = {
            id: todolistId,
            title: todolistTitle,
            filter: "all",
            addedDate: "",
            order: 0,
          }
          state.unshift(newTodolist)
        },
      ),
    }
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { deleteTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, createTodolistAC, setTodolistsAC } =
  todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
export type DomainTodolist = TodolistType & {
  filter: FilterValues
}
