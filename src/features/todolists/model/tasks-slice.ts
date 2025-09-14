import type { TasksState } from "@/app/App.tsx"
import { createTodolist, deleteTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import type {
  CreateTasksArgs,
  DeleteTasksArgs,
  DomainTask,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import type { RootState } from "@/app/store.ts"

const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => {
    return {
      //actions
      changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; taskTitle: string }>((state, action) => {
        const { todolistId, taskId, taskTitle } = action.payload
        const tasks = state[todolistId]
        const index = tasks.findIndex((t) => t.id === taskId)
        if (index !== -1) {
          tasks[index].title = taskTitle
        }
      }),
      //thunks
      fetchTasks: create.asyncThunk(
        async (arg: { todolistId: string }, thunkAPI) => {
          try {
            const res = await tasksApi.getTasks(arg.todolistId)
            return { tasks: res.data.items, todolistId: arg.todolistId }
          } catch (error) {
            thunkAPI.rejectWithValue(null)
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
            const res = await tasksApi.createTask(arg)
            return { task: res.data.data.item }
          } catch (error) {
            thunkAPI.rejectWithValue(null)
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
            await tasksApi.deleteTask(arg)
            return { todolistId: arg.todolistId, taskId: arg.taskId }
          } catch (error) {
            thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            if (action.payload) {
              const tasks = state[action.payload.todolistId]
              const index = tasks.findIndex((t) => t.id === action.payload?.taskId)
              if (index !== -1) tasks.splice(index, 1)
            }
          },
        },
      ),
      changeTaskStatus: create.asyncThunk(
        async (arg: { todolistId: string; taskId: string; status: TaskStatus }, thunkAPI) => {
          const { todolistId, taskId, status } = arg
          try {
            const state = thunkAPI.getState() as RootState
            const tasks = state.tasks
            const tasksForTodolist = tasks[todolistId]
            const currentTask = tasksForTodolist.find((t) => t.id === taskId)

            if (currentTask) {
              const model: UpdateTaskModel = {
                status,
                title: currentTask.title,
                priority: currentTask.priority,
                deadline: currentTask.deadline,
                description: currentTask.description,
                startDate: currentTask.startDate,
              }
              await tasksApi.updateTask(arg.todolistId, arg.taskId, model)
              return arg
            }
          } catch (error) {
            thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            if (action.payload) {
              const { todolistId, taskId } = action.payload
              const tasks = state[todolistId]
              const index = tasks.findIndex((t) => t.id === taskId)
              if (index !== -1) tasks[index].status = action.payload.status
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
        if (action.payload) state[action.payload.todolistId] = []
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        if (action.payload) state[action.payload.id] = []
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { deleteTask, createTask, changeTaskStatus, changeTaskTitleAC, fetchTasks } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
