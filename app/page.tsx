import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import LoginForm from "@/components/login-form"

export default async function Home() {
  const session = await getSession()

  if (session?.user) {
    if (session.user.role === "TEACHER") {
      redirect("/teacher")
    } else {
      redirect("/dashboard/news")
    }
  }

  return <LoginForm />
}
