"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Clock, FileText, Plus, BarChart3 } from "lucide-react"

export default function TeacherCourses() {
  const [activeTab, setActiveTab] = useState("active")

  // Sample courses data
  const courses = [
    {
      id: 1,
      name: "Multiagent tizimlar",
      code: "MAS001",
      students: 24,
      groups: ["210-21", "210-22"],
      schedule: "Dushanba, Chorshanba 10:00-11:30",
      progress: 75,
      status: "active",
    },
    {
      id: 2,
      name: "Katta ma'lumotlarni qayta ishlash texnologiyalari",
      code: "BDP001",
      students: 32,
      groups: ["210-21", "210-22", "210-23"],
      schedule: "Seshanba, Payshanba 13:00-14:30",
      progress: 60,
      status: "active",
    },
    {
      id: 3,
      name: "Hisob (Calculus)",
      code: "CALC101",
      students: 45,
      groups: ["110-21", "110-22"],
      schedule: "Payshanba, Juma 08:30-10:00",
      progress: 80,
      status: "active",
    },
    {
      id: 4,
      name: "Fizika I",
      code: "PHYS101",
      students: 38,
      groups: ["110-21", "110-22"],
      schedule: "Dushanba, Chorshanba 14:00-15:30",
      progress: 65,
      status: "active",
    },
    {
      id: 5,
      name: "Dasturlash asoslari",
      code: "PROG101",
      students: 50,
      groups: ["110-21", "110-22", "110-23"],
      schedule: "Seshanba, Juma 10:00-11:30",
      progress: 90,
      status: "completed",
    },
    {
      id: 6,
      name: "Ma'lumotlar bazasi",
      code: "DB201",
      students: 28,
      groups: ["210-21", "210-22"],
      schedule: "Payshanba, Juma 13:00-14:30",
      progress: 100,
      status: "completed",
    },
  ]

  const activeCourses = courses.filter((course) => course.status === "active")
  const completedCourses = courses.filter((course) => course.status === "completed")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Mening fanlarim
        </h1>
        <Button className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600">
          <Plus className="mr-2 h-4 w-4" />
          Yangi fan qo'shish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-red-600 to-red-700 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Jami fanlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{courses.length}</div>
            <p className="text-red-100 text-sm mt-1">2025 o'quv yili</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Jami talabalar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">217</div>
            <p className="text-yellow-100 text-sm mt-1">6 ta guruhda</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-yellow-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">O'rtacha o'zlashtirish</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <p className="text-yellow-100 text-sm mt-1">O'tgan semestrdan +5%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Joriy fanlar</TabsTrigger>
          <TabsTrigger value="completed">Yakunlangan fanlar</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {activeCourses.map((course) => (
              <motion.div key={course.id} variants={item}>
                <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-red-100 group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                        {course.code}
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Faol
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-xl group-hover:text-red-700 transition-colors">
                      {course.name}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-500">{course.schedule}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-red-600" />
                        <span className="text-sm">{course.students} talaba</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-red-600" />
                        <span className="text-sm">{course.groups.join(", ")}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Jarayon</span>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                      <FileText className="h-4 w-4 mr-1" />
                      Materiallar
                    </Button>
                    <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Statistika
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="completed">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {completedCourses.map((course) => (
              <motion.div key={course.id} variants={item}>
                <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-red-100 group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                        {course.code}
                      </Badge>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        Yakunlangan
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-xl group-hover:text-red-700 transition-colors">
                      {course.name}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-500">{course.schedule}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-red-600" />
                        <span className="text-sm">{course.students} talaba</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-red-600" />
                        <span className="text-sm">{course.groups.join(", ")}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Jarayon</span>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                      <FileText className="h-4 w-4 mr-1" />
                      Materiallar
                    </Button>
                    <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Statistika
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
