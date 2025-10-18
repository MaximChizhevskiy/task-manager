import "./App.css"
import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme, useAppSelector } from "@/common"
import { Header } from "@/common/components"
import { selectThemeMode } from "@/app/app-slice.ts"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar.tsx"
import { Routing } from "@/common/routing"

export type FilterValues = "all" | "active" | "completed"
export type Todolist = {
  todolistId: string
  todolistTitle: string
  filter: FilterValues
}
export type TasksState = {
  [todolistId: string]: DomainTask[]
}

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
