import { createTheme } from "@mui/material"
import type { ThemeMode } from "@/app/app-reducer.ts"

export const getTheme = (themeMode: ThemeMode) =>
  createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  })
