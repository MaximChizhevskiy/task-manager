import { z } from "zod"

export const todolistSchema = z.object({
  id: z.string(),
  addedDate: z.string(),
  order: z.number(),
  title: z.string(),
})

export type TodolistType = z.infer<typeof todolistSchema>
