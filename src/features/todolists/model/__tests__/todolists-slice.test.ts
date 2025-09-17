import { beforeEach, expect, test } from "vitest"
import {
  changeTodolistFilterAC,
  changeTodolistTitle,
  createTodolist,
  deleteTodolist,
  type DomainTodolist,
  todolistsReducer,
} from "../todolists-slice.ts"
import { nanoid } from "@reduxjs/toolkit"

const todolistId1 = nanoid()
const todolistId2 = nanoid()
let startState: DomainTodolist[] = []

beforeEach(() => {
  startState = [
    { id: todolistId1, addedDate: "", order: 0, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", addedDate: "", order: 1, filter: "all" },
  ]
})

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(
    startState,
    deleteTodolist.fulfilled({ todolistId: todolistId1 }, "requestId", { todolistId: todolistId1 }),
  )

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be created", () => {
  const todolistTitle = "Title Of New Todolist"
  const endState = todolistsReducer(
    startState,
    createTodolist.fulfilled({ id: nanoid(), title: todolistTitle, order: 3, addedDate: "" }, "requestId", {
      todolistTitle,
    }),
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolistTitle)
})

test("correct todolist should change its title", () => {
  const todolistTitle = "New Title Of Todolist"
  const endState = todolistsReducer(
    startState,
    changeTodolistTitle.fulfilled({ todolistId: todolistId2, todolistTitle }, "requestId", {
      todolistId: todolistId2,
      todolistTitle,
    }),
  )

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(todolistTitle)
})

test("correct todolist should change its filter", () => {
  const filter = "completed"
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ todolistId: todolistId2, filter }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(filter)
})
