import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import NewsFeed from "@/components/news-feed"
import { Loader2 } from "lucide-react"
import { requireAuth } from "@/lib/auth"

export default async function NewsPage() {
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
        <NewsFeed />
      </Suspense>
    </DashboardLayout>
  )
}
