import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import { CreateItemForm, EditableSpan } from "@/common/components"
import type { TodolistType } from "@/features/todolists/api/todolistApi.types.ts"
import { todolistApi } from "@/features/todolists/api/todolistApi.ts"
import Checkbox from "@mui/material/Checkbox"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import type { Task, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<TodolistType[]>([])
  const [tasks, setTasks] = useState<Record<string, Task[]>>({})

  useEffect(() => {
    // get todolists
    todolistApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      // get tasks
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
          setTasks((prevTasksState) => ({ ...prevTasksState, [todolist.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolist = (todolistTitle: string) => {
    todolistApi.createTodolists(todolistTitle).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists([newTodolist, ...todolists])
      setTasks({ ...tasks, [newTodolist.id]: [] })
    })
  }

  const deleteTodolist = (todolistId: string) => {
    todolistApi.deleteTodolists(todolistId).then(() => {
      setTodolists(todolists.filter((t) => t.id !== todolistId))
    })
  }

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    todolistApi.changeTodolistTitle(todolistId, newTitle).then(() => {
      setTodolists(todolists.map((t) => (t.id === todolistId ? { ...t, title: newTitle } : t)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask(todolistId, title).then((res) => {
      const newTask = res.data.data.item
      setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask(todolistId, taskId).then(() => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) })
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: Task) => {
    const todolistId = task.todoListId

    console.log(task)

    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi.updateTask(todolistId, task.id, model).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map((t) => (t.id === task.id ? res.data.data.item : t)),
      })
    })
  }

  const changeTaskTitle = (task: Task, title: string) => {
    const todolistId = task.todoListId

    const model: UpdateTaskModel = {
      title: title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi.updateTask(todolistId, task.id, model).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map((t) => (t.id === task.id ? res.data.data.item : t)),
      })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist: TodolistType) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan
              value={todolist.title}
              onChange={(todolistTitle) => changeTodolistTitle(todolist.id, todolistTitle)}
            />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(todolistTitle) => createTask(todolist.id, todolistTitle)} />
          {tasks[todolist.id]?.map((task) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan value={task.title} onChange={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
