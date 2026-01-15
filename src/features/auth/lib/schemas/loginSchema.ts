import { z } from "zod"

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(4, { message: "Password must be at least 5 characters" }),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export type loginArgs = z.infer<typeof loginSchema>
