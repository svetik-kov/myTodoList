import { z } from "zod"

/*export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean(),
})*/
export type Inputs = z.infer<typeof loginSchema>

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Incorrect email address" }),
  password: z.string(),
  rememberMe: z.boolean(),
})
