import { createSlice } from "@reduxjs/toolkit"
import type { RequestStatusLoading } from "@/common/types"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    statusLoading: "idle" as RequestStatusLoading,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
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
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC, setLoadingStatusAC, setAppErrorAC, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, statusLoading, selectError, selectIsLoggedIn } = appSlice.selectors
export type ThemeMode = "dark" | "light"
