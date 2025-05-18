import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// GET: /api/grades - Retrieve grades for a student
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Simulated grades data
    const grades = [
      {
        id: 1,
        course: "Katta ma'lumotlarni qayta ishlash texnologiyalari va usullari",
        courseCode: "BDP001",
        midtermGrade: 18,
        finalGrade: 72,
        totalGrade: 90,
        outOf: 100,
        status: "passed",
      },
      {
        id: 2,
        course: "Multiagent tizimlar",
        courseCode: "MAS001",
        midtermGrade: 15,
        finalGrade: 64,
        totalGrade: 79,
        outOf: 100,
        status: "passed",
      },
      {
        id: 3,
        course: "Bitiruv malakaviy ishi oldi amaliyoti",
        courseCode: "BMI005",
        midtermGrade: 0,
        finalGrade: 0,
        totalGrade: 0,
        outOf: 100,
        status: "pending",
      },
    ]

    return NextResponse.json(grades)
  } catch (error) {
    console.error("[GRADES_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
