import { redirect } from "next/navigation"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import TeacherDashboard from "@/components/teacher/teacher-dashboard"
import { requireAuth } from "@/lib/auth"

export default async function TeacherPage() {
  const user = await requireAuth()

  if (user.role !== "TEACHER") {
    redirect("/dashboard/news")
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      }
    >
      <TeacherDashboard />
    </Suspense>
  )
}
