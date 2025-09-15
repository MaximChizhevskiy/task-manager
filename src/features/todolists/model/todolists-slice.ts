import type { FilterValues } from "@/app/App.tsx"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { TodolistType } from "@/features/todolists/api/todolistApi.types.ts"
import { todolistApi } from "@/features/todolists/api/todolistApi.ts"
import { createAppSlice } from "@/common/utils"
import { setLoadingStatusAC } from "@/app/app-slice.ts"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    //actions
    return {
      changeTodolistFilterAC: create.reducer<{ todolistId: string; filter: FilterValues }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      }),
      //thunks
      fetchTodolists: create.asyncThunk(
        async (_arg, thunkAPI) => {
          try {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
            const res = await todolistApi.getTodolists()
            return { todolists: res.data }
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          } finally {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            action.payload?.todolists.forEach((t) => {
              state.push({ ...t, filter: "all" })
            })
          },
        },
      ),
    }
  },
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    builder
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
        if (action.payload) {
          const index = state.findIndex((todolist) => todolist.id === action.payload?.todolistId)
          if (index !== -1) {
            state.splice(index, 1)
          }
        }
      })
  },
})

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
export const { changeTodolistFilterAC, fetchTodolists } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
export type DomainTodolist = TodolistType & {
  filter: FilterValues
}
