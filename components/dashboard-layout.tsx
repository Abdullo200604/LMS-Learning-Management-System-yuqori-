"use client"

import { type ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  Bell,
  BookOpen,
  Calendar,
  Clipboard,
  FileText,
  GraduationCap,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Fan tanlov", href: "/dashboard/course-selection", icon: BookOpen },
  { name: "Mening fanlarim", href: "/dashboard/courses", icon: Users, badge: "4" },
  { name: "Dars jadvali", href: "/dashboard/schedule", icon: Calendar },
  { name: "Vazifalar", href: "/dashboard/assignments", icon: Clipboard },
  { name: "Qayta o'qish", href: "/dashboard/retake", icon: FileText },
  { name: "Yakuniy", href: "/dashboard/exams", icon: GraduationCap, badge: "2" },
  { name: "Individual shaxsiy reja", href: "/dashboard/study-plan", icon: FileText },
  { name: "Ma'lumot", href: "/dashboard/profile", icon: Info },
  { name: "So'rovnoma", href: "/dashboard/surveys", icon: PieChart },
  { name: "Talaba xizmatlari", href: "/dashboard/services", icon: Users },
  { name: "Testlar", href: "/dashboard/tests", icon: Clipboard },
  { name: "Diplom ishi", href: "/dashboard/thesis", icon: GraduationCap },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [notificationCount, setNotificationCount] = useState(3)
  const [currentTime, setCurrentTime] = useState("")

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formattedDate = now.toLocaleDateString("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric" })
      const formattedTime = now.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })
      setCurrentTime(`${formattedDate} | ${formattedTime}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white"
            >
              <div className="flex flex-col gap-6 py-4">
                <div className="flex items-center gap-2 px-2">
                  <Avatar>
                    <AvatarImage src="/student-avatar.png" alt="Student" />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Demo Student</p>
                    <p className="text-xs text-teal-200">ID: 12345678</p>
                  </div>
                </div>
                <nav className="flex flex-col gap-1">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "justify-between text-white hover:bg-white/10 w-full",
                          pathname === item.href && "bg-white/10 font-medium",
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-2 h-5 w-5" />
                          {item.name}
                        </div>
                        {item.badge && <Badge className="bg-emerald-400 text-white">{item.badge}</Badge>}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/dashboard/news">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-xl font-bold text-transparent">
                TATU LMS
              </div>
            </Link>
          </div>
        </div>
        <div className="relative hidden max-w-sm flex-1 md:flex md:ml-12">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Qidirish..."
            className="w-full rounded-full bg-gray-100 pl-8 focus-visible:ring-emerald-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                {notificationCount}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/student-avatar.png" alt="Student" />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Demo Student</p>
                  <p className="text-xs leading-none text-muted-foreground">demo_student@tuit.uz</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Sozlamalar</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Chiqish</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Sidebar and main content */}
      <div className="flex">
        {/* Sidebar - hidden on mobile */}
        <aside className="hidden w-64 shrink-0 border-r bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white md:block">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b border-white/10 p-4">
              <Avatar>
                <AvatarImage src="/student-avatar.png" alt="Student" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Demo Student</p>
                <p className="text-xs text-teal-200">ID: 12345678</p>
              </div>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between text-white hover:bg-white/10",
                        pathname === item.href && "bg-white/10 font-medium",
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.name}
                      </div>
                      {item.badge && <Badge className="bg-emerald-400 text-white">{item.badge}</Badge>}
                    </Button>
                  </Link>
                ))}
              </div>
            </nav>
            <div className="border-t border-white/10 p-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/10"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Chiqish
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">
            {/* Server time */}
            <div className="mb-4 flex items-center justify-end gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <span>Server vaqti</span>
                <span className="ml-2 font-medium">{currentTime}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 3v4"></path>
                  <path d="M15 21v-4"></path>
                  <path d="M3 15h4"></path>
                  <path d="M21 15h-4"></path>
                  <path d="m9 3 1 1"></path>
                  <path d="M9 21 10 20"></path>
                  <path d="m3 9 1 1"></path>
                  <path d="m21 9-1 1"></path>
                  <circle cx="15" cy="15" r="2"></circle>
                </svg>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/student-avatar.png" alt="Student" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
