import "./App.css"
import { type Task } from "../features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme, useAppSelector } from "@/common"
import { Main } from "@/app/Main.tsx"
import { Header } from "@/common/components"
import { selectThemeMode } from "@/app/app-slice.ts"

export type FilterValues = "all" | "active" | "completed"
export type Todolist = {
  todolistId: string
  todolistTitle: string
  filter: FilterValues
}
export type TasksState = {
  [todolistId: string]: Task[]
}

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
