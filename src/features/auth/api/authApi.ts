import type { BaseResponse } from "@/common/types"
import { instance } from "@/common"
import type { Inputs } from "@/features/auth/lib/schemas"

export const authApi = {
  login(payload: Inputs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("auth/login", payload)
  },
}
