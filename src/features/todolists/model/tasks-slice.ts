import type { TasksState } from "@/app/App.tsx"
import { createTodolist, deleteTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import type {
  CreateTasksArgs,
  DeleteTasksArgs,
  DomainTask,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts"
import type { RootState } from "@/app/store.ts"
import { setLoadingStatusAC } from "@/app/app-slice.ts"
import { ResultCode } from "@/common/enums/enums.ts"

const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => {
    return {
      fetchTasks: create.asyncThunk(
        async (arg: { todolistId: string }, thunkAPI) => {
          try {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
            const res = await tasksApi.getTasks(arg.todolistId)
            return { tasks: res.data.items, todolistId: arg.todolistId }
          } catch (error) {
            handleServerNetworkError(thunkAPI.dispatch, error)
            thunkAPI.rejectWithValue(null)
          } finally {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            if (action.payload) state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),
      createTask: create.asyncThunk(
        async (arg: CreateTasksArgs, thunkAPI) => {
          try {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
            const res = await tasksApi.createTask(arg)
            if (res.data.resultCode === ResultCode.Success) {
              return { task: res.data.data.item }
            } else {
              handleServerAppError<{ item: DomainTask }>(thunkAPI.dispatch, res.data)
            }
          } catch (error: unknown) {
            handleServerNetworkError(thunkAPI.dispatch, error)
          } finally {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            if (action.payload) {
              const newTask: DomainTask = action.payload.task
              state[newTask.todoListId].unshift(newTask)
            }
          },
        },
      ),
      deleteTask: create.asyncThunk(
        async (arg: DeleteTasksArgs, thunkAPI) => {
          try {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
            const res = await tasksApi.deleteTask(arg)
            if (res.data.resultCode === ResultCode.Success) {
              return { todolistId: arg.todolistId, taskId: arg.taskId }
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
            console.log(action)
            console.log(state)
            if (action.payload) {
              const tasks = state[action.payload.todolistId]
              const index = tasks.findIndex((t) => t.id === action.payload?.taskId)
              if (index !== -1) tasks.splice(index, 1)
            }
          },
        },
      ),
      updateTask: create.asyncThunk(
        async (arg: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> }, thunkAPI) => {
          try {
            thunkAPI.dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
            const { todolistId, taskId, domainModel } = arg

            const state = thunkAPI.getState() as RootState
            const tasks = state.tasks
            const tasksForTodolist = tasks[todolistId]
            const currentTask = tasksForTodolist.find((t) => t.id === taskId)

            if (currentTask) {
              const model: UpdateTaskModel = {
                title: currentTask.title,
                status: currentTask.status,
                priority: currentTask.priority,
                deadline: currentTask.deadline,
                description: currentTask.description,
                startDate: currentTask.startDate,
                ...domainModel,
              }
              const res = await tasksApi.updateTask(arg.todolistId, arg.taskId, model)
              if (res.data.resultCode === ResultCode.Success) {
                return { task: res.data.data.item }
              } else {
                handleServerAppError<{ item: DomainTask }>(thunkAPI.dispatch, res.data)
              }
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
              const allTodolistTasks = state[action.payload.task.todoListId]
              const taskIndex = allTodolistTasks.findIndex((task) => task.id === action.payload!.task.id)
              if (taskIndex !== -1) {
                allTodolistTasks[taskIndex] = action.payload.task
              }
            }
          },
        },
      ),
    }
  },
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        if (action.payload) delete state[action.payload.todolistId]
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        if (action.payload) state[action.payload.id] = []
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { deleteTask, createTask, updateTask, fetchTasks } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
