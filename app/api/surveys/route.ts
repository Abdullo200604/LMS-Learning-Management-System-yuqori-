import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const isTeacher = session.user.role === "TEACHER"

    // Simulated surveys data
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
        status: isTeacher ? "draft" : "upcoming",
      },
    ]

    return NextResponse.json(surveys)
  } catch (error) {
    console.error("[SURVEYS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    if (session.user.role === "TEACHER") {
      // Teacher creating a survey
      const { title, description, endDate } = body

      if (!title || !description || !endDate) {
        return new NextResponse("Missing required fields", { status: 400 })
      }

      return NextResponse.json({ message: "Survey created" }, { status: 201 })
    } else {
      // Student submitting a survey response
      const { surveyId, answers } = body

      if (!surveyId || !answers) {
        return new NextResponse("Missing required fields", { status: 400 })
      }

      return NextResponse.json({ message: "Survey submitted" }, { status: 201 })
    }
  } catch (error) {
    console.error("[SURVEYS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
