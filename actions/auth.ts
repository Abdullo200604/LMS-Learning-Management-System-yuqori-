"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export const login = async (formData: FormData) => {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return { error: "Foydalanuvchi nomi va parol kiritilishi shart" }
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Noto'g'ri foydalanuvchi nomi yoki parol" }
        default:
          return { error: "Tizimga kirishda xatolik yuz berdi" }
      }
    }

    return { error: "Tizimga kirishda xatolik yuz berdi" }
  }
}
