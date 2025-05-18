import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// GET: /api/courses - Retrieve courses
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Simulated courses data (in a real app, this would come from the database)
    const courses = [
      {
        id: 1,
        name: "Multiagent tizimlar",
        code: "MAS001",
        teacher: "Abdurazzogov Faxriddin Bekpo'latovich",
        score: 7,
        schedule: "Dushanba, Chorshanba 10:00-11:30",
        progress: 75,
        credits: 6,
      },
      {
        id: 2,
        name: "Katta ma'lumotlarni qayta ishlash texnologiyalari va usullari",
        code: "BDP001",
        teacher: "Karimov Abdulatif Botirovich",
        score: 2,
        schedule: "Seshanba, Payshanba 13:00-14:30",
        progress: 60,
        credits: 6,
      },
      {
        id: 3,
        name: "Bitiruv malakaviy ishi oldi amaliyoti",
        code: "BMI005",
        teacher: "Javliyev Shahzod Alisher o'g'li",
        score: 0,
        schedule: "Juma 09:00-12:30",
        progress: 40,
        credits: 2,
      },
      {
        id: 4,
        name: "Antirelyar va toshqinlarning tarqalishi",
        code: "ATT002",
        teacher: "Xusanov Sherzod Abdimanonovich",
        score: 0,
        schedule: "Payshanba, Juma 13:00-14:30",
        progress: 20,
        credits: 4,
      },
    ]

    return NextResponse.json(courses)
  } catch (error) {
    console.error("[COURSES_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// POST: /api/courses - Create a new course (teacher only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "TEACHER") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, code, schedule, credits } = body

    if (!name || !code || !schedule || !credits) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // In a real app, this would create a record in the database
    // const course = await db.course.create({
    //   data: {
    //     name,
    //     code,
    //     schedule,
    //     credits: parseInt(credits),
    //     teacherId: session.user.id,
    //   }
    // });

    return NextResponse.json({ message: "Course created" }, { status: 201 })
  } catch (error) {
    console.error("[COURSES_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
