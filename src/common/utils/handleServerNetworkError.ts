import { setAppErrorAC } from "@/app/app-slice.ts"
import type { Dispatch } from "@reduxjs/toolkit"

export const handleServerNetworkError = (dispatch: Dispatch, error: { message: string }) => {
  dispatch(setAppErrorAC({ error: error.message }))
}
