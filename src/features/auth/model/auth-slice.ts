import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import type { Inputs } from "@/features/auth/lib/schemas"
import { authApi } from "@/features/auth/api/authApi.ts"
import { setLoadingStatusAC } from "@/app/app-slice.ts"
import { ResultCode } from "@/common/enums/enums.ts"
import { AUTH_TOKEN } from "@/common/constants"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: Inputs, { dispatch }) => {
        try {
          dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
          const res = await authApi.login(data)
          if (res.data.resultCode === ResultCode.Success) {
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true }
          } else {
            handleServerAppError(dispatch, res.data)
          }
        } catch (error: any) {
          handleServerNetworkError(dispatch, error)
        } finally {
          dispatch(setLoadingStatusAC({ statusLoading: "idle" }))
        }
      },

      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload!.isLoggedIn
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_arg, { dispatch }) => {
        try {
          dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
          const res = await authApi.logOut()
          if (res.data.resultCode === ResultCode.Success) {
            localStorage.removeItem(AUTH_TOKEN)
            return { isLoggedIn: false }
          } else {
            handleServerAppError(dispatch, res.data)
          }
        } catch (error: any) {
          handleServerNetworkError(dispatch, error)
        } finally {
          dispatch(setLoadingStatusAC({ statusLoading: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload!.isLoggedIn
        },
      },
    ),
    initializeTC: create.asyncThunk(
      async (_arg, { dispatch }) => {
        try {
          dispatch(setLoadingStatusAC({ statusLoading: "loading" }))
          const res = await authApi.me()
          if (res.data.resultCode === ResultCode.Success) {
            return { isLoggedIn: true }
          } else {
            handleServerAppError(dispatch, res.data)
          }
        } catch (error: any) {
          handleServerNetworkError(dispatch, error)
        } finally {
          dispatch(setLoadingStatusAC({ statusLoading: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload!.isLoggedIn
        },
      },
    ),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC, logoutTC, initializeTC } = authSlice.actions
export const authReducer = authSlice.reducer
