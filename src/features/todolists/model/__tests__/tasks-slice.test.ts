import { beforeEach, expect, test } from "vitest"
import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"
import { createTodolist, deleteTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { createTask, deleteTask, tasksReducer, updateTask } from "@/features/todolists/model/tasks-slice.ts"

let startState = {}

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
}

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  }
})

test("array should be created for new todolist", () => {
  const endState = tasksReducer(
    startState,
    createTodolist.fulfilled({ id: "todolistId3", title: "todolistTitle", order: 3, addedDate: "" }, "requestId", {
      todolistTitle: "todolistTitle",
    }),
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("New key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  //NOT WORK
  const endState = tasksReducer(
    startState,
    deleteTodolist.fulfilled({ todolistId: "todolistId2" }, "requestId", { todolistId: "todolistId2" }),
  )

  const keys = Object.keys(endState)
  console.log(keys)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTask.fulfilled({ todolistId: "todolistId2", taskId: "2" }, "requestId", {
      todolistId: "todolistId2",
      taskId: "2",
    }),
  )

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },

      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  })
})

test("correct task should be created at correct array", () => {
  const endState = tasksReducer(
    startState,
    createTask.fulfilled(
      {
        task: {
          id: "4",
          title: "juice",
          status: TaskStatus.New,
          todoListId: "todolistId2",
          ...taskDefaultValues,
        },
      },
      "requestId",
      { todolistId: "todolistId2", title: "juice" },
    ),
  )

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe("juice")
  expect(endState.todolistId2[0].status).toBe(TaskStatus.New)
})

test("correct task should change its status", () => {
  const endState = tasksReducer(
    startState,
    updateTask.fulfilled(
      {
        task: {
          id: "3",
          title: "tea",
          status: TaskStatus.Completed,
          todoListId: "todolistId2",
          ...taskDefaultValues,
        },
      },
      "requestId",
      { todolistId: "todolistId2", taskId: "3", domainModel: { status: TaskStatus.New } },
    ),
  )

  expect(endState.todolistId2.length).toBe(3)
  expect(endState.todolistId2[2].status).toBe(TaskStatus.Completed)
})

test("correct task should change its title", () => {
  const endState = tasksReducer(
    startState,
    updateTask.fulfilled(
      {
        task: {
          id: "3",
          title: "jam",
          status: TaskStatus.New,
          todoListId: "todolistId2",
          ...taskDefaultValues,
        },
      },
      "requestId",
      { todolistId: "todolistId2", taskId: "3", domainModel: { title: "tea" } },
    ),
  )

  expect(endState.todolistId2.length).toBe(3)
  expect(endState.todolistId2[2].title).toBe("jam")
})
