import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import StudentProfile from "@/components/student-profile"
import { Loader2 } from "lucide-react"
import { requireAuth } from "@/lib/auth"

export default async function ProfilePage() {
  await requireAuth()

  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="flex h-[400px] w-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          </div>
        }
      >
        <StudentProfile />
      </Suspense>
    </DashboardLayout>
  )
}
