import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import { CreateItemForm, EditableSpan } from "@/common/components"
import type { TodolistType } from "@/features/todolists/api/todolistApi.types.ts"
import { todolistApi } from "@/features/todolists/api/todolistApi.ts"
import Checkbox from "@mui/material/Checkbox"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<TodolistType[]>([])
  const [tasks, setTasks] = useState<any>({})

  useEffect(() => {
    // get todolists
    todolistApi.getTodolists().then((res) => {
      setTodolists(res.data)
      console.log(res.data)
    })
  }, [])

  const createTodolist = (todolistTitle: string) => {
    todolistApi.createTodolists(todolistTitle).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists([newTodolist, ...todolists])
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

  const createTask = (todolistId: string, title: string) => {}

  const deleteTask = (todolistId: string, taskId: string) => {}

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {}

  const changeTaskTitle = (task: any, title: string) => {}

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
          {tasks[todolist.id]?.map((task: any) => (
            <div key={task.id}>
              <Checkbox checked={task.isDone} onChange={(e) => changeTaskStatus(e, task)} />
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
