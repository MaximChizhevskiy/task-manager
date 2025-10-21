import { setAppErrorAC } from "@/app/app-slice.ts"
import type { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"
import { z } from "zod"

export const handleServerNetworkError = (dispatch: Dispatch, error: unknown) => {
  let errorMessage = "Some error occurred"

  if (axios.isAxiosError(error)) {
    errorMessage = error.message
  } else if (error instanceof Error) {
    if (error instanceof z.ZodError) {
      console.table(error.issues)
      errorMessage = "ZOD Error in the console "
    } else {
      errorMessage = error.message
    }
  } else {
    errorMessage = JSON.stringify(error)
  }
  dispatch(setAppErrorAC({ error: errorMessage }))
}
