import type { TasksState } from "../../../app/App.tsx"
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer.ts"
import type { Task } from "../ui/Todolists/TodolistItem/TodolistItem.tsx"
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{ todolistId: string; taskId: string }>("tasks/deleteTask")
export const createTaskAC = createAction<{ todolistId: string; taskTitle: string }>("tasks/createTask")
export const changeTaskStatusAC = createAction<{ todolistId: string; taskId: string; isDone: boolean }>(
  "tasks/changeTaskStatus",
)
export const changeTaskTitleAC = createAction<{ todolistId: string; taskId: string; taskTitle: string }>(
  "tasks/changeTaskTitle",
)

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.todolistId] = []
    })
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.todolistId]
    })
    .addCase(deleteTaskAC, (state, action) => {
      const { todolistId, taskId } = action.payload
      const tasks = state[todolistId]
      state[todolistId] = tasks.filter((t) => t.taskId !== taskId)
    })
    .addCase(createTaskAC, (state, action) => {
      const { todolistId, taskTitle } = action.payload
      const newTask: Task = {
        taskId: nanoid(),
        taskTitle,
        isDone: false,
      }
      state[todolistId].unshift(newTask)
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const { todolistId, taskId, isDone } = action.payload
      const tasks = state[todolistId]
      const index = tasks.findIndex((t) => t.taskId === taskId)
      if (index !== -1) {
        tasks[index].isDone = isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const { todolistId, taskId, taskTitle } = action.payload
      const tasks = state[todolistId]
      const index = tasks.findIndex((t) => t.taskId === taskId)
      if (index !== -1) {
        tasks[index].taskTitle = taskTitle
      }
    })
})
