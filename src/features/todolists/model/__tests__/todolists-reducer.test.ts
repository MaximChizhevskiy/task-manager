import { beforeEach, expect, test } from "vitest"
import type { Todolist } from "@/app/App.tsx"
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer,
} from "../todolists-slice.ts"
import { nanoid } from "@reduxjs/toolkit"

const todolistId1 = nanoid()
const todolistId2 = nanoid()
let startState: Todolist[] = []

beforeEach(() => {
  startState = [
    { todolistId: todolistId1, todolistTitle: "What to learn", filter: "all" },
    { todolistId: todolistId2, todolistTitle: "What to buy", filter: "all" },
  ]
})

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(startState, deleteTodolistAC({ todolistId: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].todolistId).toBe(todolistId2)
})

test("correct todolist should be created", () => {
  const todolistTitle = "Title Of New Todolist"
  const endState = todolistsReducer(startState, createTodolistAC(todolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].todolistTitle).toBe(todolistTitle)
})

test("correct todolist should change its title", () => {
  const todolistTitle = "New Title Of Todolist"
  const endState = todolistsReducer(startState, changeTodolistTitleAC({ todolistId: todolistId2, todolistTitle }))

  expect(endState[0].todolistTitle).toBe("What to learn")
  expect(endState[1].todolistTitle).toBe(todolistTitle)
})

test("correct todolist should change its filter", () => {
  const filter = "completed"
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ todolistId: todolistId2, filter }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(filter)
})
