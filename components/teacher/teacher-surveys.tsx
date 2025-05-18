"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PieChart, BarChart, Users, Calendar, FileText, Plus, AlertTriangle, CheckCircle } from "lucide-react"

export default function TeacherSurveys() {
  const [activeTab, setActiveTab] = useState("active")

  // Sample surveys data
  const surveys = [
    {
      id: 1,
      title: "Yakuniy nazoratlarni dam olish kunlarida o'tkazish",
      description: "Yakuniy nazoratlarni dam olish kunlarida o'tkazish haqida so'rovnoma",
      participants: 45,
      totalStudents: 78,
      startDate: "14.05.2025",
      endDate: "28.05.2025",
      status: "active",
    },
    {
      id: 2,
      title: "Yakuniy nazoratlarni dam olish kunida o'tkazish",
      description: "Yakuniy nazoratlarni dam olish kunida o'tkazish haqida so'rovnoma",
      participants: 62,
      totalStudents: 78,
      startDate: "14.02.2024",
      endDate: "28.02.2024",
      status: "completed",
    },
    {
      id: 3,
      title: "Amaliy mashg'ulotlar sifati haqida",
      description: "Amaliy mashg'ulotlar sifati haqida talabalar fikri",
      participants: 0,
      totalStudents: 78,
      startDate: "01.06.2025",
      endDate: "15.06.2025",
      status: "draft",
    },
  ]

  const activeSurveys = surveys.filter((survey) => survey.status === "active")
  const completedSurveys = surveys.filter((survey) => survey.status === "completed")
  const draftSurveys = surveys.filter((survey) => survey.status === "draft")

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
          So'rovnomalar
        </h1>
        <Button className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600">
          <Plus className="mr-2 h-4 w-4" />
          Yangi so'rovnoma
        </Button>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Eslatma</AlertTitle>
        <AlertDescription className="text-blue-700">
          Amalasidagi so'rovnomalar mavjud emas. Yangi so'rovnoma yaratish uchun "Yangi so'rovnoma" tugmasini bosing.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Amalasi</TabsTrigger>
          <TabsTrigger value="completed">Tugallangan</TabsTrigger>
          <TabsTrigger value="draft">Qoralama</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeSurveys.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {activeSurveys.map((survey) => (
                <motion.div key={survey.id} variants={item}>
                  <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-red-100 group">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                          Faol
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {survey.startDate} - {survey.endDate}
                        </div>
                      </div>
                      <CardTitle className="mt-2 text-xl group-hover:text-red-700 transition-colors">
                        {survey.title}
                      </CardTitle>
                      <CardDescription>{survey.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-red-600" />
                          <span className="text-sm">
                            {survey.participants} / {survey.totalStudents} qatnashuvchi
                          </span>
                        </div>
                        <div className="flex items-center">
                          <PieChart className="h-4 w-4 mr-1 text-red-600" />
                          <span className="text-sm">
                            {Math.round((survey.participants / survey.totalStudents) * 100)}% ishtirok etish
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Jarayon</span>
                          <span className="text-sm font-medium">
                            {Math.round((survey.participants / survey.totalStudents) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-500"
                            style={{ width: `${Math.round((survey.participants / survey.totalStudents) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                        <FileText className="h-4 w-4 mr-1" />
                        Batafsil
                      </Button>
                      <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                        <BarChart className="h-4 w-4 mr-1" />
                        Natijalar
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <FileText className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Amalasidagi so'rovnomalar mavjud emas</h3>
              <p className="text-gray-500 max-w-md mb-6">
                Hozirda amalasidagi so'rovnomalar mavjud emas. Yangi so'rovnoma yaratish uchun "Yangi so'rovnoma"
                tugmasini bosing.
              </p>
              <Button className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600">
                <Plus className="mr-2 h-4 w-4" />
                Yangi so'rovnoma
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {completedSurveys.map((survey) => (
              <motion.div key={survey.id} variants={item}>
                <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-red-100 group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        Yakunlangan
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {survey.startDate} - {survey.endDate}
                      </div>
                    </div>
                    <CardTitle className="mt-2 text-xl group-hover:text-red-700 transition-colors">
                      {survey.title}
                    </CardTitle>
                    <CardDescription>{survey.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-red-600" />
                        <span className="text-sm">
                          {survey.participants} / {survey.totalStudents} qatnashuvchi
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm">Yakunlangan</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Ishtirok</span>
                        <span className="text-sm font-medium">
                          {Math.round((survey.participants / survey.totalStudents) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gray-500"
                          style={{ width: `${Math.round((survey.participants / survey.totalStudents) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                      <FileText className="h-4 w-4 mr-1" />
                      Batafsil
                    </Button>
                    <Button className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600">
                      <BarChart className="h-4 w-4 mr-1" />
                      Natijalar
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="draft">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {draftSurveys.map((survey) => (
              <motion.div key={survey.id} variants={item}>
                <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-red-100 group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Qoralama
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {survey.startDate} - {survey.endDate}
                      </div>
                    </div>
                    <CardTitle className="mt-2 text-xl group-hover:text-red-700 transition-colors">
                      {survey.title}
                    </CardTitle>
                    <CardDescription>{survey.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-red-600" />
                        <span className="text-sm">{survey.totalStudents} potensial qatnashuvchi</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-yellow-600" />
                        <span className="text-sm">Qoralama holatida</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                      <FileText className="h-4 w-4 mr-1" />
                      Tahrirlash
                    </Button>
                    <Button className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Faollashtirish
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
