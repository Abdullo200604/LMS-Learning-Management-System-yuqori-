"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Plus, Users, Clock, CheckCircle, Edit } from "lucide-react"

export default function TeacherTests() {
  // Sample tests data
  const tests = [
    {
      id: 1,
      title: "Hisob (Calculus)",
      description: "Differensial va integral hisob asoslari bo'yicha test",
      date: "15.04.2022",
      time: "10:00",
      duration: "90 daqiqa",
      questions: 30,
      participants: 45,
      status: "completed",
    },
    {
      id: 2,
      title: "Fizika I",
      description: "Mexanika va termodinamika asoslari bo'yicha test",
      date: "16.01.2022",
      time: "13:00",
      duration: "90 daqiqa",
      questions: 25,
      participants: 38,
      status: "completed",
    },
    {
      id: 3,
      title: "Antirelyar va toshqinlarning tarqalishi",
      description: "Elektromagnit to'lqinlar va ularning tarqalishi bo'yicha test",
      date: "07.06.2025",
      time: "15:00",
      duration: "60 daqiqa",
      questions: 20,
      participants: 0,
      status: "upcoming",
    },
  ]

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
          Testlar
        </h1>
        <Button className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600">
          <Plus className="mr-2 h-4 w-4" />
          Yangi test yaratish
        </Button>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {tests.map((test) => (
          <motion.div key={test.id} variants={item}>
            <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-red-100 group h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge
                    className={
                      test.status === "completed"
                        ? "bg-gray-100 text-gray-800 border-gray-200"
                        : "bg-green-100 text-green-800 border-green-200"
                    }
                  >
                    {test.status === "completed" ? "Yakunlangan" : "Rejalashtirilgan"}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {test.date}
                  </div>
                </div>
                <CardTitle className="mt-2 text-xl group-hover:text-red-700 transition-colors">{test.title}</CardTitle>
                <CardDescription>{test.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Vaqt</span>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1 text-red-600" />
                      <span>{test.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Davomiyligi</span>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1 text-red-600" />
                      <span>{test.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Savollar</span>
                    <div className="flex items-center mt-1">
                      <FileText className="h-4 w-4 mr-1 text-red-600" />
                      <span>{test.questions} ta</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Qatnashuvchilar</span>
                    <div className="flex items-center mt-1">
                      <Users className="h-4 w-4 mr-1 text-red-600" />
                      <span>{test.participants}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                {test.status === "completed" ? (
                  <>
                    <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                      <FileText className="h-4 w-4 mr-1" />
                      Natijalar
                    </Button>
                    <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                      <Edit className="h-4 w-4 mr-1" />
                      Nusxa olish
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                      <Edit className="h-4 w-4 mr-1" />
                      Tahrirlash
                    </Button>
                    <Button className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Faollashtirish
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
