import type { FilterValues } from "@/app/App.tsx"
import type { TodolistType } from "@/features/todolists/api/todolistApi.types.ts"
import { todolistApi } from "@/features/todolists/api/todolistApi.ts"
import { createAppSlice } from "@/common/utils"
import { setLoadingStatusAC } from "@/app/app-slice.ts"
import type { RequestStatusLoading } from "@/common/types"

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
              state.push({ ...t, filter: "all", entityStatus: "idle" })
            })
          },
        },
      ),
      createTodolist: create.asyncThunk(
        async (arg: { todolistTitle: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
            const res = await todolistApi.createTodolists(arg.todolistTitle)
            console.log(res.data.data.item)
            return res.data.data.item
          } catch (error) {
            thunkAPI.rejectWithValue(null)
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
            await todolistApi.deleteTodolists(arg.todolistId)
            return { todolistId: arg.todolistId }
          } catch (error) {
            thunkAPI.dispatch(changeTodolistEntityStatusAC({ todolistId: arg.todolistId, entityStatus: "failed" }))
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
            await todolistApi.changeTodolistTitle(arg.todolistId, arg.todolistTitle)
            return arg
          } catch (error) {
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
