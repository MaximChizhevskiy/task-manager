import type { FilterValues, Todolist } from "@/app/App.tsx"
import { createSlice, nanoid } from "@reduxjs/toolkit"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as Todolist[],
  reducers: (create) => {
    return {
      deleteTodolistAC: create.reducer<{ todolistId: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.todolistId === action.payload.todolistId)
        if (index !== -1) {
          state.splice(index, 1)
        }
      }),
      changeTodolistTitleAC: create.reducer<{ todolistId: string; todolistTitle: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.todolistId === action.payload.todolistId)
        if (index !== -1) {
          state[index].todolistTitle = action.payload.todolistTitle
        }
      }),
      changeTodolistFilterAC: create.reducer<{ todolistId: string; filter: FilterValues }>((state, action) => {
        const todolist = state.find((todolist) => todolist.todolistId === action.payload.todolistId)
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
          const newTodolist: Todolist = {
            todolistId,
            todolistTitle,
            filter: "all",
          }
          state.unshift(newTodolist)
        },
      ),
    }
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { deleteTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, createTodolistAC } =
  todolistsSlice.actions
