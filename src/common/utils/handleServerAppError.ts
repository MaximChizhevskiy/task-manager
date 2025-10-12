import { setAppErrorAC } from "@/app/app-slice.ts"
import type { Dispatch } from "@reduxjs/toolkit"
import type { BaseResponse } from "@/common/types"

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponse<T>) => {
  const error = data.messages.length ? data.messages[0] : "Some error occurred"
  dispatch(setAppErrorAC({ error }))
}
