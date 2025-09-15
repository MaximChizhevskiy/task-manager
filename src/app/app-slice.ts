import { createSlice } from "@reduxjs/toolkit"
import type { RequestStatusLoading } from "@/common/types"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    statusLoading: "idle" as RequestStatusLoading,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setLoadingStatusAC: create.reducer<{ statusLoading: RequestStatusLoading }>((state, action) => {
      state.statusLoading = action.payload.statusLoading
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    statusLoading: (state) => state.statusLoading,
  },
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC, setLoadingStatusAC } = appSlice.actions
export const { selectThemeMode, statusLoading } = appSlice.selectors
export type ThemeMode = "dark" | "light"
