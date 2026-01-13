import type { BaseResponse } from "@/common/types"
import { instance } from "@/common"
import type { Inputs } from "@/features/auth/lib/schemas"
import type { LoginResponse, MeResponse } from "@/features/auth/api/authApi.types.ts"

export const _authApi = {
  login(payload: Inputs) {
    return instance.post<BaseResponse<LoginResponse>>("auth/login", payload)
  },
  logOut() {
    return instance.delete<BaseResponse>("auth/login")
  },
  me() {
    return instance.get<BaseResponse<MeResponse>>("auth/me")
  },
}
