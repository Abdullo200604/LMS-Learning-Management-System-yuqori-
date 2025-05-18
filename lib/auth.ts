import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const getSession = async () => {
  return await getServerSession(authOptions)
}

export const getCurrentUser = async () => {
  const session = await getSession()

  if (!session?.user) {
    return null
  }

  return session.user
}

export const requireAuth = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return user
}
