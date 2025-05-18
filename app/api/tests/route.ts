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

    // Simulated tests data
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
        score: isTeacher ? null : 28,
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
        score: isTeacher ? null : 22,
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
        score: null,
      },
    ]

    return NextResponse.json(tests)
  } catch (error) {
    console.error("[TESTS_GET]", error)
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
      // Teacher creating a test
      const { title, description, date, time, duration, questions } = body

      if (!title || !description || !date || !time || !duration || !questions) {
        return new NextResponse("Missing required fields", { status: 400 })
      }

      return NextResponse.json({ message: "Test created" }, { status: 201 })
    } else {
      // Student submitting a test
      const { testId, answers } = body

      if (!testId || !answers) {
        return new NextResponse("Missing required fields", { status: 400 })
      }

      return NextResponse.json({ message: "Test submitted" }, { status: 201 })
    }
  } catch (error) {
    console.error("[TESTS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
