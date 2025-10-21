import { z } from "zod"

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(5, { message: "Password must be at least 5 characters" }),
  rememberMe: z.boolean(),
})

export type Inputs = z.infer<typeof loginSchema>
