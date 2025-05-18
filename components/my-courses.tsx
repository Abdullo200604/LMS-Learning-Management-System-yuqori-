"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Calendar, Download, Loader2 } from "lucide-react"
import { getCourses } from "@/actions/courses"

interface Course {
  id: number
  name: string
  teacher: string
  score: number
  schedule?: string
}

export default function MyCourses() {
  const [semester, setSemester] = useState("2024-2025 Ikkinchi semestr")
  const [perPage, setPerPage] = useState("10")
  const [searchTerm, setSearchTerm] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses()
        setCourses(data)
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-700">Mening fanlarim</h1>
        <div className="flex items-center gap-2">
          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Semestr tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-2025 Ikkinchi semestr">2024-2025 Ikkinchi semestr</SelectItem>
              <SelectItem value="2024-2025 Birinchi semestr">2024-2025 Birinchi semestr</SelectItem>
              <SelectItem value="2023-2024 Ikkinchi semestr">2023-2024 Ikkinchi semestr</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
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
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Izlash:</span>
          <Input className="w-[200px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[300px]">Fan</TableHead>
              <TableHead>O'qituvchi</TableHead>
              <TableHead>Davomat</TableHead>
              <TableHead>Amal</TableHead>
              <TableHead>Reja</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  Fanlar topilmadi
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{course.teacher}</TableCell>
                  <TableCell>{course.score}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2 border-emerald-200 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Vazifalar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-emerald-200 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-emerald-200 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          Jami {filteredCourses.length} ta, 1 dan {Math.min(filteredCourses.length, Number.parseInt(perPage))} gachasi
          ko'rsatilmoqda
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="w-8 h-8 p-0">
            Avvalgi
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0 bg-emerald-700 text-white">
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
