import { createSlice } from "@reduxjs/toolkit"
import type { RequestStatusLoading } from "@/common/types"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    statusLoading: "idle" as RequestStatusLoading,
    error: null as string | null,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setLoadingStatusAC: create.reducer<{ statusLoading: RequestStatusLoading }>((state, action) => {
      state.statusLoading = action.payload.statusLoading
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    statusLoading: (state) => state.statusLoading,
    selectError: (state) => state.error,
  },
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC, setLoadingStatusAC, setAppErrorAC } = appSlice.actions
export const { selectThemeMode, statusLoading, selectError } = appSlice.selectors
export type ThemeMode = "dark" | "light"
