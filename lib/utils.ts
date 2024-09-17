import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import z from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema =  (type : string) => z.object({
  //Sign Up
  username: type === "sign-in" ? z.string().optional() :  z.string().min(3),

  //Sign In & Sign Up
  email: z.string().email(),
  password: z.string().min(8),
})