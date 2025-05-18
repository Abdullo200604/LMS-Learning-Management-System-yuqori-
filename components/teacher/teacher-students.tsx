"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, UserPlus } from "lucide-react"

export default function TeacherStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState("all")

  // Sample students data
  const students = [
    {
      id: 1,
      name: "Aljonov Azamjon",
      group: "210-21",
      courses: ["MAS001", "BDP001"],
      attendance: 92,
      performance: 85,
      status: "active",
    },
    {
      id: 2,
      name: "Karimov Abdulatif",
      group: "210-21",
      courses: ["MAS001", "BDP001"],
      attendance: 88,
      performance: 78,
      status: "active",
    },
    {
      id: 3,
      name: "Javliyev Shahzod",
      group: "210-22",
      courses: ["MAS001"],
      attendance: 95,
      performance: 92,
      status: "active",
    },
    {
      id: 4,
      name: "Xusanov Sherzod",
      group: "210-22",
      courses: ["BDP001"],
      attendance: 85,
      performance: 75,
      status: "active",
    },
    {
      id: 5,
      name: "Abdurazzogov Faxriddin",
      group: "210-23",
      courses: ["BDP001"],
      attendance: 78,
      performance: 68,
      status: "warning",
    },
    {
      id: 6,
      name: "Bekpo'latov Sardor",
      group: "210-23",
      courses: ["MAS001", "BDP001"],
      attendance: 65,
      performance: 60,
      status: "warning",
    },
    {
      id: 7,
      name: "Toshmatov Jasur",
      group: "110-21",
      courses: ["CALC101", "PHYS101"],
      attendance: 90,
      performance: 88,
      status: "active",
    },
    {
      id: 8,
      name: "Ergashev Bobur",
      group: "110-21",
      courses: ["CALC101", "PHYS101"],
      attendance: 93,
      performance: 90,
      status: "active",
    },
  ]

  // Filter students based on search term, group and course
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGroup = selectedGroup === "all" || student.group === selectedGroup
    const matchesCourse = selectedCourse === "all" || student.courses.includes(selectedCourse)
    return matchesSearch && matchesGroup && matchesCourse
  })

  // Get unique groups
  const groups = [...new Set(students.map((student) => student.group))]

  // Get unique courses
  const courses = [...new Set(students.flatMap((student) => student.courses))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Talabalar
        </h1>
        <Button className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600">
          <UserPlus className="mr-2 h-4 w-4" />
          Talaba qo'shish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="bg-gradient-to-br from-red-600 to-red-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Jami talabalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{students.length}</div>
              <p className="text-red-100 text-sm mt-1">4 ta guruhda</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">O'rtacha davomat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(students.reduce((acc, student) => acc + student.attendance, 0) / students.length)}%
              </div>
              <p className="text-yellow-100 text-sm mt-1">O'tgan oydan +2%</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-red-500 to-yellow-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">O'rtacha o'zlashtirish</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(students.reduce((acc, student) => acc + student.performance, 0) / students.length)}%
              </div>
              <p className="text-yellow-100 text-sm mt-1">O'tgan semestrdan +5%</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Talaba qidirish..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Guruh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha guruhlar</SelectItem>
                    {groups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Fan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha fanlar</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Talaba</TableHead>
                <TableHead>Guruh</TableHead>
                <TableHead>Fanlar</TableHead>
                <TableHead className="text-center">Davomat</TableHead>
                <TableHead className="text-center">O'zlashtirish</TableHead>
                <TableHead className="text-center">Holat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/student-${student.id}.png`} alt={student.name} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-500">ID: {100000 + student.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.group}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.courses.map((course) => (
                        <Badge key={course} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center">
                      <span className="font-medium">{student.attendance}%</span>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            student.attendance >= 90
                              ? "bg-green-500"
                              : student.attendance >= 75
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center">
                      <span className="font-medium">{student.performance}%</span>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            student.performance >= 85
                              ? "bg-green-500"
                              : student.performance >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${student.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        student.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }
                    >
                      {student.status === "active" ? "Faol" : "Ogohlantirish"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
