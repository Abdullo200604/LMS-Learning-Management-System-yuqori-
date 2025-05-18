"use server"

import { revalidatePath } from "next/cache"
import { requireAuth } from "@/lib/auth"

export const getAssignments = async () => {
  const user = await requireAuth()

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/assignments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["assignments"] },
    })

    if (!res.ok) {
      throw new Error("Failed to fetch assignments")
    }

    return await res.json()
  } catch (error) {
    console.error("Error fetching assignments:", error)
    throw error
  }
}

export const submitAssignment = async (formData: FormData) => {
  const user = await requireAuth()

  const assignmentId = formData.get("assignmentId") as string
  const content = formData.get("content") as string

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignmentId,
        content,
      }),
    })

    if (!res.ok) {
      throw new Error("Failed to submit assignment")
    }

    revalidatePath("/dashboard/assignments")
    return await res.json()
  } catch (error) {
    console.error("Error submitting assignment:", error)
    throw error
  }
}
