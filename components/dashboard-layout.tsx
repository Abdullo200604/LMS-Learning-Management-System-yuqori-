"use client"

import { type ReactNode, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, Users, ClipboardList, LogOut, Menu, Home, BarChart, FileText, Calendar } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Mock user data - haqiqiy loyihada auth kontekstidan olinadi
  const user = {
    name: "Foydalanuvchi",
    role: pathname.startsWith("/admin") ? "admin" : pathname.startsWith("/teacher") ? "teacher" : "student",
  }

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  const handleLogout = () => {
    // Haqiqiy loyihada auth kontekstidan logout funksiyasi chaqiriladi
    router.push("/login")
  }

  // Foydalanuvchi roliga qarab navigatsiya elementlari
  const getNavItems = () => {
    switch (user.role) {
      case "admin":
        return [
          { href: "/admin/classes", label: "Sinflar", icon: <BookOpen className="h-5 w-5" /> },
          { href: "/admin/users", label: "Foydalanuvchilar", icon: <Users className="h-5 w-5" /> },
          { href: "/admin/statistics", label: "Statistika", icon: <BarChart className="h-5 w-5" /> },
        ]
      case "teacher":
        return [
          { href: "/teacher/courses", label: "Mening kurslarim", icon: <BookOpen className="h-5 w-5" /> },
          { href: "/teacher/journal", label: "Jurnal", icon: <ClipboardList className="h-5 w-5" /> },
        ]
      case "student":
        return [
          { href: "/student/assignments", label: "Topshiriqlar", icon: <FileText className="h-5 w-5" /> },
          { href: "/student/schedule", label: "Dars jadvali", icon: <Calendar className="h-5 w-5" /> },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  const NavLinks = () => (
    <div className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
            pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
          onClick={() => setIsOpen(false)}
        >
          {item.icon}
          <span className="ml-3">{item.label}</span>
        </Link>
      ))}
    </div>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-card md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center">
            <Home className="mr-2 h-5 w-5 text-primary" />
            <span className="text-lg font-bold">EduMaster LMS</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4 px-3">
          <NavLinks />
        </div>
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role === "admin" ? "Admin" : user.role === "teacher" ? "O'qituvchi" : "O'quvchi"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header and Sidebar */}
      <div className="flex w-full flex-col md:ml-64 md:w-[calc(100%-16rem)]">
        <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-4 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <Home className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-lg font-bold">EduMaster LMS</span>
                </Link>
              </div>
              <div className="py-4 px-3">
                <NavLinks />
              </div>
              <div className="absolute bottom-0 left-0 right-0 border-t p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user.role === "admin" ? "Admin" : user.role === "teacher" ? "O'qituvchi" : "O'quvchi"}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex flex-1 items-center justify-between">
            <span className="text-lg font-bold">EduMaster LMS</span>
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
