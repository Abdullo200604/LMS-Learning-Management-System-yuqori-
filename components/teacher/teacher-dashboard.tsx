"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  MessageSquare,
  PieChart,
  Settings,
  Users,
  Bell,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import TeacherCourses from "@/components/teacher/teacher-courses"
import TeacherStudents from "@/components/teacher/teacher-students"
import TeacherSurveys from "@/components/teacher/teacher-surveys"
import TeacherTests from "@/components/teacher/teacher-tests"
import TeacherGraduation from "@/components/teacher/teacher-graduation"

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("courses")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="inset" className="bg-gradient-to-b from-red-700 via-red-600 to-yellow-600">
          <SidebarHeader className="flex items-center gap-2 px-6 py-4">
            <Avatar>
              <AvatarImage src="/teacher-avatar.png" alt="Teacher" />
              <AvatarFallback>OT</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">O'qituvchi</p>
              <p className="text-xs text-yellow-200">Kompyuter injiniringi</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-white/10">
                  <Home className="h-5 w-5" />
                  <span>Bosh sahifa</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-white/10">
                  <BookOpen className="h-5 w-5" />
                  <span>Mening fanlarim</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-white/10">
                  <Users className="h-5 w-5" />
                  <span>Talabalar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-white/10">
                  <Calendar className="h-5 w-5" />
                  <span>Dars jadvali</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-white/10">
                  <ClipboardList className="h-5 w-5" />
                  <span>Vazifalar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-white/10">
                  <FileText className="h-5 w-5" />
                  <span>Testlar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-white/10">
                  <PieChart className="h-5 w-5" />
                  <span>So'rovnomalar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-white/10">
                  <BarChart3 className="h-5 w-5" />
                  <span>Statistika</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-white/10">
                  <GraduationCap className="h-5 w-5" />
                  <span>Diplom ishlari</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-white/10">
                  <MessageSquare className="h-5 w-5" />
                  <span>Xabarlar</span>
                  <Badge className="ml-auto bg-yellow-500 text-white">3</Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-white/10 p-4">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start text-white hover:bg-white/10">
                <Settings className="mr-2 h-5 w-5" />
                Sozlamalar
              </Button>
              <Button variant="ghost" className="justify-start text-white hover:bg-white/10">
                <LogOut className="mr-2 h-5 w-5" />
                Chiqish
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="bg-gray-50">
          <div className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 bg-clip-text text-xl font-bold text-transparent">
                O'QITUVCHI PORTALI
              </div>
            </div>
            <div className="relative max-w-sm flex-1 mx-12">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Qidirish..."
                className="w-full rounded-full bg-gray-100 pl-8 focus-visible:ring-red-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-xs text-white">
                  3
                </span>
                <span className="sr-only">Notifications</span>
              </Button>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500">Server vaqti</div>
                <div className="text-sm font-medium">15.05.2025 | 18:17</div>
              </div>
              <Avatar>
                <AvatarImage src="/teacher-avatar.png" alt="Teacher" />
                <AvatarFallback>OT</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="container mx-auto p-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="courses">Fanlar</TabsTrigger>
                  <TabsTrigger value="students">Talabalar</TabsTrigger>
                  <TabsTrigger value="surveys">So'rovnomalar</TabsTrigger>
                  <TabsTrigger value="tests">Testlar</TabsTrigger>
                  <TabsTrigger value="graduation">Diplom ishlari</TabsTrigger>
                </TabsList>
                <TabsContent value="courses">
                  <TeacherCourses />
                </TabsContent>
                <TabsContent value="students">
                  <TeacherStudents />
                </TabsContent>
                <TabsContent value="surveys">
                  <TeacherSurveys />
                </TabsContent>
                <TabsContent value="tests">
                  <TeacherTests />
                </TabsContent>
                <TabsContent value="graduation">
                  <TeacherGraduation />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
