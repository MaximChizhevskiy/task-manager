import type { TasksState } from "@/app/App.tsx"
import type { Task } from "../ui/Todolists/TodolistItem/TodolistItem.tsx"
import { createSlice, nanoid } from "@reduxjs/toolkit"
import { createTodolist, deleteTodolist } from "@/features/todolists/model/todolists-slice.ts"

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => {
    return {
      deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
        delete state[action.payload.todolistId]
      }),
      createTaskAC: create.reducer<{ todolistId: string; taskTitle: string }>((state, action) => {
        const { todolistId, taskTitle } = action.payload
        const newTask: Task = {
          taskId: nanoid(),
          taskTitle,
          isDone: false,
        }
        state[todolistId].unshift(newTask)
      }),
      changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; taskTitle: string }>((state, action) => {
        const { todolistId, taskId, taskTitle } = action.payload
        const tasks = state[todolistId]
        const index = tasks.findIndex((t) => t.taskId === taskId)
        if (index !== -1) {
          tasks[index].taskTitle = taskTitle
        }
      }),
      changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
        const { todolistId, taskId, isDone } = action.payload
        const tasks = state[todolistId]
        const index = tasks.findIndex((t) => t.taskId === taskId)
        if (index !== -1) {
          tasks[index].isDone = isDone
        }
      }),
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
export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
