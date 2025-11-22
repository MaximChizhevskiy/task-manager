import { CircularProgress, ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme, useAppDispatch, useAppSelector } from "@/common"
import { Header } from "@/common/components"
import { selectThemeMode } from "@/app/app-slice.ts"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar.tsx"
import { Routing } from "@/common/routing"
import { useEffect, useState } from "react"
import { initializeTC } from "@/features/auth/model/auth-slice.ts"
import styles from "./App.module.css"

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
  const [isInitialized, setIsInitialized] = useState(false)
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeTC()).finally(() => {
      setIsInitialized(true)
    })
  }, [])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.app}>
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
