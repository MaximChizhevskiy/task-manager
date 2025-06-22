import { beforeEach, expect, test } from "vitest"
import type { TasksState } from "../../../../app/App.tsx"
import { createTodolistAC, deleteTodolistAC } from "../todolists-reducer.ts"
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer } from "../tasks-reducer.ts"

let startState: TasksState = {}

beforeEach(() => {
  startState = {
    todolistId1: [
      { taskId: "1", taskTitle: "CSS", isDone: false },
      { taskId: "2", taskTitle: "JS", isDone: true },
      { taskId: "3", taskTitle: "React", isDone: false },
    ],
    todolistId2: [
      { taskId: "1", taskTitle: "bread", isDone: false },
      { taskId: "2", taskTitle: "milk", isDone: true },
      { taskId: "3", taskTitle: "tea", isDone: false },
    ],
  }
})

test("array should be created for new todolist", () => {
  const endState = tasksReducer(startState, createTodolistAC("New todolist"))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("New key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, deleteTodolistAC({ todolistId: "todolistId2" }))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(startState, deleteTaskAC({ todolistId: "todolistId2", taskId: "2" }))

  expect(endState).toEqual({
    todolistId1: [
      { taskId: "1", taskTitle: "CSS", isDone: false },
      { taskId: "2", taskTitle: "JS", isDone: true },
      { taskId: "3", taskTitle: "React", isDone: false },
    ],
    todolistId2: [
      { taskId: "1", taskTitle: "bread", isDone: false },
      { taskId: "3", taskTitle: "tea", isDone: false },
    ],
  })
})

test("correct task should be created at correct array", () => {
  const endState = tasksReducer(
    startState,
    createTaskAC({
      todolistId: "todolistId2",
      taskTitle: "juice",
    }),
  )

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].taskId).toBeDefined()
  expect(endState.todolistId2[0].taskTitle).toBe("juice")
  expect(endState.todolistId2[0].isDone).toBe(false)
})

test("correct task should change its status", () => {
  const endState = tasksReducer(
    startState,
    changeTaskStatusAC({ todolistId: "todolistId2", taskId: "2", isDone: false }),
  )

  expect(endState.todolistId2.length).toBe(3)
  expect(endState.todolistId2[1].isDone).toBe(false)
})

test("correct task should change its title", () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitleAC({ todolistId: "todolistId2", taskId: "2", taskTitle: "banana" }),
  )

  expect(endState.todolistId2.length).toBe(3)
  expect(endState.todolistId2[1].taskTitle).toBe("banana")
})
