import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  EduMaster LMS Platformasi
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Ta'lim jarayonini samarali boshqarish uchun zamonaviy platforma
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button>Kirish</Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline">Ro'yxatdan o'tish</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Admin uchun</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Sinflar va foydalanuvchilarni boshqarish, statistikalarni ko'rish
                  </p>
                </div>
                <Link href="/admin/classes">
                  <Button variant="outline">Admin paneli</Button>
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">O'qituvchi uchun</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Fanlar va topshiriqlar yaratish, o'quvchilarni baholash
                  </p>
                </div>
                <Link href="/teacher/courses">
                  <Button variant="outline">O'qituvchi paneli</Button>
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">O'quvchi uchun</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Topshiriqlarni ko'rish va yuborish, baholarga kirish
                  </p>
                </div>
                <Link href="/student/assignments">
                  <Button variant="outline">O'quvchi paneli</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
