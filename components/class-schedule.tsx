"use client"

import React, { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

interface ClassSchedule {
  day: string
  classes: {
    time: string
    subject: string
    teacher: string
    room: string
    type: string
  }[]
}

export default function ClassSchedule() {
  const [semester, setSemester] = useState("2024-2025 Ikkinchi semestr")
  const [schedule, setSchedule] = useState<ClassSchedule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  )

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("/api/schedule")
        if (response.ok) {
          const data = await response.json()
          setSchedule(data)
        } else {
          console.error("Failed to fetch schedule")
        }
      } catch (error) {
        console.error("Error fetching schedule:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSchedule()
  }, [])

  // Time slots
  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]

  const handlePreviousWeek = () => {
    // In a real app, would fetch previous week's schedule
    const date = new Date()
    date.setDate(date.getDate() - 7)
    setCurrentDate(
      date.toLocaleDateString("uz-UZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    )
  }

  const handleNextWeek = () => {
    // In a real app, would fetch next week's schedule
    const date = new Date()
    date.setDate(date.getDate() + 7)
    setCurrentDate(
      date.toLocaleDateString("uz-UZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-700">Dars jadvali</h1>
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

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          className="border-emerald-200 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
          onClick={handlePreviousWeek}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Oldingi hafta
        </Button>
        <div className="text-sm font-medium">Kun: {currentDate}</div>
        <Button
          variant="outline"
          size="sm"
          className="border-emerald-200 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
          onClick={handleNextWeek}
        >
          Keyingi hafta
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[100px_repeat(6,1fr)] border rounded-md">
              {/* Header row with days */}
              <div className="border-b border-r p-2 bg-gray-50"></div>
              {schedule.map((day, index) => (
                <div key={index} className="border-b border-r p-2 text-center font-medium bg-gray-50">
                  {day.day}
                </div>
              ))}

              {/* Time slots and classes */}
              {timeSlots.map((time, timeIndex) => (
                <React.Fragment key={timeIndex}>
                  <div className="border-b border-r p-2 text-center text-sm">{time}</div>
                  {schedule.map((day, dayIndex) => {
                    const classForThisTime = day.classes.find((c) => c.time === time)

                    return (
                      <div
                        key={`${timeIndex}-${dayIndex}`}
                        className={`border-b border-r p-2 ${dayIndex === 3 || dayIndex === 4 ? "bg-emerald-50/50" : ""}`}
                      >
                        {classForThisTime && (
                          <div className="bg-teal-100 p-2 rounded text-xs h-full shadow-sm">
                            <div className="font-medium">{classForThisTime.subject}</div>
                            <div>{classForThisTime.teacher}</div>
                            <div className="mt-1 text-teal-700">{classForThisTime.room}</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
