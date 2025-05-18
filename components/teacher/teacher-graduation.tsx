"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, Plus, FileText, CheckCircle, XCircle, Clock, Edit } from "lucide-react"

export default function TeacherGraduation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [perPage, setPerPage] = useState("10")

  // Sample graduation projects data
  const projects = [
    {
      id: 1,
      title: "Katta ma'lumotlarni qayta ishlash texnologiyalari va usullari",
      student: "Aljonov Azamjon",
      group: "210-21",
      status: "approved",
      progress: 70,
      submissionDate: "15.06.2025",
    },
    {
      id: 2,
      title: "Multiagent tizimlar",
      student: "Karimov Abdulatif",
      group: "210-21",
      status: "in_progress",
      progress: 45,
      submissionDate: "15.06.2025",
    },
    {
      id: 3,
      title: "Elektromagnit to'lqinlar va ularning tarqalishi",
      student: "Javliyev Shahzod",
      group: "210-22",
      status: "approved",
      progress: 60,
      submissionDate: "15.06.2025",
    },
    {
      id: 4,
      title: "Kompyuter tarmoqlari",
      student: "Xusanov Sherzod",
      group: "210-22",
      status: "pending",
      progress: 0,
      submissionDate: "15.06.2025",
    },
    {
      id: 5,
      title: "Ma'lumotlar bazasi",
      student: "Abdurazzogov Faxriddin",
      group: "210-23",
      status: "rejected",
      progress: 0,
      submissionDate: "15.06.2025",
    },
  ]

  // Filter projects based on search term and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.student.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  // Status badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Tasdiqlangan
          </Badge>
        )
      case "in_progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <FileText className="h-3 w-3 mr-1" />
            Jarayonda
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Kutilmoqda
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rad etilgan
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Diplom ishlari
        </h1>
        <Button className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600">
          <Plus className="mr-2 h-4 w-4" />
          Yangi mavzu qo'shish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="bg-gradient-to-br from-red-600 to-red-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Jami mavzular</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{projects.length}</div>
              <p className="text-red-100 text-sm mt-1">2025 o'quv yili</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Tasdiqlangan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{projects.filter((p) => p.status === "approved").length}</div>
              <p className="text-green-100 text-sm mt-1">Tasdiqlangan mavzular</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Jarayonda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{projects.filter((p) => p.status === "in_progress").length}</div>
              <p className="text-yellow-100 text-sm mt-1">Ishlanayotgan mavzular</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-red-500 to-yellow-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Kutilmoqda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{projects.filter((p) => p.status === "pending").length}</div>
              <p className="text-yellow-100 text-sm mt-1">Tasdiqlanishi kutilayotgan</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Select value={perPage} onValueChange={setPerPage}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">ta qatorni ko'rsat</span>
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Qidirish..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Holat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha holatlar</SelectItem>
                    <SelectItem value="approved">Tasdiqlangan</SelectItem>
                    <SelectItem value="in_progress">Jarayonda</SelectItem>
                    <SelectItem value="pending">Kutilmoqda</SelectItem>
                    <SelectItem value="rejected">Rad etilgan</SelectItem>
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
                <TableHead>Mavzu</TableHead>
                <TableHead>Talaba</TableHead>
                <TableHead>Guruh</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Jarayon</TableHead>
                <TableHead>Topshirish sanasi</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Ma'lumot topilmadi
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium max-w-[300px] truncate">{project.title}</TableCell>
                    <TableCell>{project.student}</TableCell>
                    <TableCell>{project.group}</TableCell>
                    <TableCell>{renderStatusBadge(project.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              project.status === "rejected"
                                ? "bg-red-500"
                                : "bg-gradient-to-r from-red-600 via-red-500 to-yellow-500"
                            }`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{project.submissionDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          Jami {filteredProjects.length} ta, 1 dan {Math.min(filteredProjects.length, Number.parseInt(perPage))} gachasi
          ko'rsatilmoqda
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="w-8 h-8 p-0">
            Avvalgi
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0 bg-red-700 text-white">
            1
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0">
            Keyingi
          </Button>
        </div>
      </div>
    </div>
  )
}
