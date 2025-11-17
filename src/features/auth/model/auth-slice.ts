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
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC } = authSlice.actions
export const authReducer = authSlice.reducer
