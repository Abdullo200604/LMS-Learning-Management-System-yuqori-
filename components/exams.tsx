"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"

interface Grade {
  id: number
  course: string
  courseCode: string
  midtermGrade: number
  finalGrade: number
  totalGrade: number
  outOf: number
  status: string
}

export default function Exams() {
  const [semester, setSemester] = useState("2024-2025 Ikkinchi semestr")
  const [perPage, setPerPage] = useState("15")
  const [searchTerm, setSearchTerm] = useState("")
  const [grades, setGrades] = useState<Grade[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch("/api/grades")
        if (response.ok) {
          const data = await response.json()
          setGrades(data)
        } else {
          console.error("Failed to fetch grades")
        }
      } catch (error) {
        console.error("Error fetching grades:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGrades()
  }, [])

  const filteredGrades = grades.filter(
    (grade) =>
      grade.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.courseCode.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-700">Yakuniy</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-emerald-700 border-emerald-200 hover:bg-emerald-50">
            Qidirish
          </Button>
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
              <SelectValue placeholder="15" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
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
              <TableHead>Fanlar kodi</TableHead>
              <TableHead>Oraliq</TableHead>
              <TableHead>Yakuniy</TableHead>
              <TableHead>Jami</TableHead>
              <TableHead>Baho</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredGrades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  Ma'lumotlar topilmadi
                </TableCell>
              </TableRow>
            ) : (
              filteredGrades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.course}</TableCell>
                  <TableCell>{grade.courseCode}</TableCell>
                  <TableCell>{grade.midtermGrade}</TableCell>
                  <TableCell>{grade.finalGrade}</TableCell>
                  <TableCell>{grade.totalGrade}</TableCell>
                  <TableCell>
                    <div
                      className={`text-center font-medium 
                      ${
                        grade.totalGrade >= 86
                          ? "text-emerald-600"
                          : grade.totalGrade >= 71
                            ? "text-blue-600"
                            : grade.totalGrade >= 55
                              ? "text-amber-600"
                              : "text-gray-600"
                      }`}
                    >
                      {grade.totalGrade >= 86
                        ? "A"
                        : grade.totalGrade >= 71
                          ? "B"
                          : grade.totalGrade >= 55
                            ? "C"
                            : grade.status === "pending"
                              ? "-"
                              : "F"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full 
                      ${
                        grade.status === "passed"
                          ? "bg-emerald-100 text-emerald-800"
                          : grade.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {grade.status === "passed" ? "O'tdi" : grade.status === "pending" ? "Kutilmoqda" : "O'tmadi"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          Jami {filteredGrades.length} ta, 1 dan {Math.min(filteredGrades.length, Number.parseInt(perPage))} gachasi
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
