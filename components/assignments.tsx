"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { getAssignments, submitAssignment } from "@/actions/assignments"

interface Assignment {
  id: number
  title: string
  description: string
  courseCode: string
  dueDate: string
  status: "pending" | "completed" | "overdue"
  type: string
}

export default function Assignments() {
  const [semester, setSemester] = useState("2024-2025 Ikkinchi semestr")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [submissionContent, setSubmissionContent] = useState("")

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments()
        setAssignments(data)
        filterAssignmentsByDate(data, date)
      } catch (error) {
        console.error("Error fetching assignments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAssignments()
  }, [])

  useEffect(() => {
    filterAssignmentsByDate(assignments, date)
  }, [date])

  const filterAssignmentsByDate = (assignments: Assignment[], selectedDate?: Date) => {
    if (!selectedDate) return

    const dateString = selectedDate.toISOString().split("T")[0]

    const filtered = assignments.filter((assignment) => {
      const dueDate = new Date(assignment.dueDate).toISOString().split("T")[0]
      return dueDate === dateString
    })

    setFilteredAssignments(filtered)
  }

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAssignment) return

    const formData = new FormData()
    formData.append("assignmentId", selectedAssignment.id.toString())
    formData.append("content", submissionContent)

    try {
      await submitAssignment(formData)

      // Update the local state to show completed
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === selectedAssignment.id ? { ...assignment, status: "completed" as const } : assignment,
      )

      setAssignments(updatedAssignments)
      filterAssignmentsByDate(updatedAssignments, date)

      setSelectedAssignment(null)
      setSubmissionContent("")
    } catch (error) {
      console.error("Error submitting assignment:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 border-amber-200 text-amber-800"
      case "completed":
        return "bg-emerald-50 border-emerald-200 text-emerald-800"
      case "overdue":
        return "bg-red-50 border-red-200 text-red-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Topshirilmagan"
      case "completed":
        return "Topshirilgan"
      case "overdue":
        return "Muddati o'tgan"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-700">Vazifalar</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <div className="border rounded-md p-4 bg-white">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-200 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
              </Button>
              <div className="text-sm font-medium">
                {date?.toLocaleDateString("default", { month: "long", year: "numeric" })}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-200 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
              >
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vazifalar</CardTitle>
            <CardDescription>
              {date?.toLocaleDateString("default", { day: "numeric", month: "long", year: "numeric" })} sanasidagi
              vazifalar
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
              </div>
            ) : filteredAssignments.length > 0 ? (
              <div className="space-y-4">
                {filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className={`border ${getStatusColor(assignment.status)}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <Badge variant="outline" className={getStatusColor(assignment.status)}>
                          {getStatusText(assignment.status)}
                        </Badge>
                      </div>
                      <CardDescription>{assignment.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Fan kodi:</span> {assignment.courseCode}
                        </div>
                        <div>
                          <span className="font-medium">Tip:</span> {assignment.type}
                        </div>
                        <div>
                          <span className="font-medium">Muddat:</span>{" "}
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {assignment.status === "pending" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                              onClick={() => setSelectedAssignment(assignment)}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Topshirish
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <form onSubmit={handleSubmitAssignment}>
                              <DialogHeader>
                                <DialogTitle>Vazifani topshirish</DialogTitle>
                                <DialogDescription>
                                  {assignment.title} - {assignment.courseCode}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="message">Izoh</Label>
                                  <Textarea
                                    id="message"
                                    placeholder="Vazifa haqida izoh yozing"
                                    value={submissionContent}
                                    onChange={(e) => setSubmissionContent(e.target.value)}
                                    rows={5}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="file">Fayl</Label>
                                  <Input type="file" id="file" className="cursor-pointer" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                                >
                                  Topshirish
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      )}

                      {assignment.status === "completed" && (
                        <Button
                          variant="outline"
                          className="border-emerald-200 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                        >
                          Ko'rish
                        </Button>
                      )}

                      {assignment.status === "overdue" && (
                        <Button
                          variant="outline"
                          className="border-red-200 text-red-700 hover:text-red-800 hover:bg-red-50"
                        >
                          Kechikkan
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">Bu kunda vazifalar mavjud emas</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Missing prop for the Input component
function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className || ""}`}
      {...props}
    />
  )
}
