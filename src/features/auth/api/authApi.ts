import type { BaseResponse } from "@/common/types"
import type { loginArgs } from "@/features/auth/lib/schemas"
import type { LoginResponse, MeResponse } from "@/features/auth/api/authApi.types.ts"
import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<BaseResponse<LoginResponse>, loginArgs>({
      query: (body) => {
        return {
          method: "POST",
          url: "auth/login",
          body,
        }
      },
    }),
    logOut: builder.mutation<BaseResponse<LoginResponse>, void>({
      query: () => {
        return {
          method: "DELETE",
          url: "auth/login",
        }
      },
    }),
    me: builder.query<BaseResponse<MeResponse>, void>({
      query: () => "auth/me",
    }),
  }),
})

export const { useLoginMutation, useLogOutMutation, useMeQuery } = authApi
