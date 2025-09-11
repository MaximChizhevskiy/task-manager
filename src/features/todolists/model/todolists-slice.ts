import type { FilterValues } from "@/app/App.tsx"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { TodolistType } from "@/features/todolists/api/todolistApi.types.ts"
import { todolistApi } from "@/features/todolists/api/todolistApi.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      changeTodolistFilterAC: create.reducer<{ todolistId: string; filter: FilterValues }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      }),
    }
  },
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTodolists.fulfilled, (state, action) => {
        action.payload?.todolists.forEach((t) => {
          state.push({ ...t, filter: "all" })
        })
      })
      .addCase(setTodolists.rejected, () => {
        // обработка ошибки при запросе за тудулистами
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
        if (index !== -1) {
          state[index].title = action.payload.todolistTitle
        }
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        if (action.payload) {
          state.unshift({ ...action.payload, filter: "all" })
        }
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        if (!action.payload) return

        const index = state.findIndex((todolist) => todolist.id === action.payload?.todolistId)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
  },
})

export const setTodolists = createAsyncThunk(
  `${todolistsSlice.name}/setTodolists`,
  async (_arg, { rejectWithValue }) => {
    try {
      const res = await todolistApi.getTodolists()
      return { todolists: res.data }
    } catch (error) {
      return rejectWithValue(null)
    }
  },
)

export const createTodolist = createAsyncThunk(
  `${todolistsSlice.name}/createTodolist`,
  async (arg: { todolistTitle: string }, { rejectWithValue }) => {
    try {
      const res = await todolistApi.createTodolists(arg.todolistTitle)
      return res.data.data.item
    } catch (error) {
      rejectWithValue(null)
    }
  },
)

export const changeTodolistTitle = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitle`,
  async (arg: { todolistId: string; todolistTitle: string }, { rejectWithValue }) => {
    try {
      await todolistApi.changeTodolistTitle(arg.todolistId, arg.todolistTitle)
      return arg
    } catch (error) {
      console.log(error)
      return rejectWithValue(null)
    }
  },
)

export const deleteTodolist = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolist`,
  async (arg: { todolistId: string }, { rejectWithValue }) => {
    try {
      await todolistApi.deleteTodolists(arg.todolistId)
      return { todolistId: arg.todolistId }
    } catch (error) {
      rejectWithValue(null)
    }
  },
)

export const todolistsReducer = todolistsSlice.reducer
export const { changeTodolistFilterAC } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
export type DomainTodolist = TodolistType & {
  filter: FilterValues
}
