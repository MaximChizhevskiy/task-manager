import type { FilterValues } from "@/app/App.tsx"
import { todolistSchema, type TodolistType } from "@/features/todolists/api/todolistApi.types.ts"
import { _todolistApi } from "@/features/todolists/api/_todolistApi.ts"
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { setLoadingStatusAC } from "@/app/app-slice.ts"
import type { RequestStatusLoading } from "@/common/types"
import { ResultCode } from "@/common/enums/enums.ts"
import { clearDataAC } from "@/common/actions"

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
      changeTodolistEntityStatusAC: create.reducer<{ todolistId: string; entityStatus: RequestStatusLoading }>(
        (state, action) => {
          const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
          if (todolist) {
            todolist.entityStatus = action.payload.entityStatus
          }
        },
      ),
      //thunks
      fetchTodolists: create.asyncThunk(
        async (_arg, thunkAPI) => {
          try {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
            const res = await _todolistApi.getTodolists()
            todolistSchema.array().parse(res.data)
            return { todolists: res.data }
          } catch (error: unknown) {
            handleServerNetworkError(thunkAPI.dispatch, error)
            return thunkAPI.rejectWithValue(null)
          } finally {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            action.payload?.todolists.forEach((t) => {
              state.push({ ...t, filter: "all", entityStatus: "idle" })
            })
          },
        },
      ),
      createTodolist: create.asyncThunk(
        async (arg: { todolistTitle: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
            const res = await _todolistApi.createTodolists(arg.todolistTitle)
            if (res.data.resultCode === ResultCode.Success) {
              return res.data.data.item
            } else {
              handleServerAppError<{ item: TodolistType }>(thunkAPI.dispatch, res.data)
            }
          } catch (error: any) {
            handleServerNetworkError(thunkAPI.dispatch, error)
          } finally {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            if (action.payload) {
              state.unshift({ ...action.payload, filter: "all", entityStatus: "idle" })
            }
          },
        },
      ),
      deleteTodolist: create.asyncThunk(
        async (arg: { todolistId: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(changeTodolistEntityStatusAC({ todolistId: arg.todolistId, entityStatus: "loading" }))
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
            const res = await _todolistApi.deleteTodolists(arg.todolistId)
            if (res.data.resultCode === ResultCode.Success) {
              return { todolistId: arg.todolistId }
            } else {
              handleServerAppError(thunkAPI.dispatch, res.data)
            }
          } catch (error) {
            handleServerNetworkError(thunkAPI.dispatch, error)
          } finally {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "idle" }))
            thunkAPI.dispatch(changeTodolistEntityStatusAC({ todolistId: arg.todolistId, entityStatus: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            if (action.payload) {
              const index = state.findIndex((todolist) => todolist.id === action.payload?.todolistId)
              if (index !== -1) {
                state.splice(index, 1)
              }
            }
          },
        },
      ),
      changeTodolistTitle: create.asyncThunk(
        async (arg: { todolistId: string; todolistTitle: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
            const res = await _todolistApi.changeTodolistTitle(arg.todolistId, arg.todolistTitle)
            if (res.data.resultCode === ResultCode.Success) {
              return arg
            } else {
              handleServerAppError(thunkAPI.dispatch, res.data)
            }
          } catch (error) {
            handleServerNetworkError(thunkAPI.dispatch, error)
            thunkAPI.rejectWithValue(null)
          } finally {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            if (action.payload) {
              const index = state.findIndex((todolist) => todolist.id === action.payload?.todolistId)
              if (index !== -1) {
                state[index].title = action.payload.todolistTitle
              }
            }
          },
        },
      ),
    }
  },
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    builder.addCase(clearDataAC.type, () => {
      return []
    })
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  changeTodolistFilterAC,
  fetchTodolists,
  deleteTodolist,
  createTodolist,
  changeTodolistTitle,
  changeTodolistEntityStatusAC,
} = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

export type DomainTodolist = TodolistType & {
  filter: FilterValues
  entityStatus: RequestStatusLoading
}
