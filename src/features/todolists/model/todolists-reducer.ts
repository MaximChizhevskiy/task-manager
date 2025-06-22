import type { FilterValues, Todolist } from "../../../app/App.tsx"
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{ todolistId: string }>("todolists/deleteTodolist")
export const createTodolistAC = createAction("todolists/createTodolist", (todolistTitle: string) => {
  return { payload: { todolistId: nanoid(), todolistTitle } }
})
export const changeTodolistTitleAC = createAction<{ todolistId: string; todolistTitle: string }>(
  "todolists/changeTodolistTitle",
)
export const changeTodolistFilterAC = createAction<{ todolistId: string; filter: FilterValues }>(
  "todolists/changeTodolistFilter",
)

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex((todolist) => todolist.todolistId === action.payload.todolistId)
      if (index !== -1) {
        state.splice(index, 1)
      }
    })
    .addCase(createTodolistAC, (state, action) => {
      state.unshift({ ...action.payload, filter: "all" })
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex((todolist) => todolist.todolistId === action.payload.todolistId)
      if (index !== -1) {
        state[index].todolistTitle = action.payload.todolistTitle
      }
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.find((todolist) => todolist.todolistId === action.payload.todolistId)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    })
})
