"use server"

import { revalidatePath } from "next/cache"
import { requireAuth } from "@/lib/auth"

export const getCourses = async () => {
  const user = await requireAuth()

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["courses"] },
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses")
    }

    return await res.json()
  } catch (error) {
    console.error("Error fetching courses:", error)
    throw error
  }
}

export const createCourse = async (formData: FormData) => {
  const user = await requireAuth()

  if (user.role !== "TEACHER") {
    throw new Error("Only teachers can create courses")
  }

  const name = formData.get("name") as string
  const code = formData.get("code") as string
  const schedule = formData.get("schedule") as string
  const credits = formData.get("credits") as string

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        code,
        schedule,
        credits,
      }),
    })

    if (!res.ok) {
      throw new Error("Failed to create course")
    }

    revalidatePath("/teacher")
    return await res.json()
  } catch (error) {
    console.error("Error creating course:", error)
    throw error
  }
}
