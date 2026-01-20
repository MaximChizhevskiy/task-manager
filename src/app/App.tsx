import { CircularProgress, ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme, useAppDispatch, useAppSelector } from "@/common"
import { Header } from "@/common/components"
import { selectThemeMode, setIsLoggedIn } from "@/app/app-slice.ts"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar.tsx"
import { Routing } from "@/common/routing"
import { useEffect, useState } from "react"
import styles from "./App.module.css"
import { useMeQuery } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"

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

  const dispatch = useAppDispatch()
  const { data, isLoading } = useMeQuery()

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    }
    setIsInitialized(true)
  }, [isLoading])

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
