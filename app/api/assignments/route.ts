import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// GET: /api/assignments - Retrieve assignments for a student
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Simulated assignments data
    const assignments = [
      {
        id: 1,
        title: "Bitiruv malakaviy ishi oldi amaliyoti",
        description: "Amaliyot bo'yicha hisobot topshirish",
        courseCode: "BMI005",
        dueDate: "2025-05-20",
        status: "pending",
        type: "Amaliy",
      },
      {
        id: 2,
        title: "Multiagent tizimlar loyihasi",
        description: "Final loyiha ishi",
        courseCode: "MAS001",
        dueDate: "2025-05-25",
        status: "completed",
        type: "Loyiha",
      },
      {
        id: 3,
        title: "Katta ma'lumotlar analitikasi",
        description: "Ma'lumotlar tahlili bo'yicha topshiriq",
        courseCode: "BDP001",
        dueDate: "2025-05-15",
        status: "overdue",
        type: "Laboratoriya",
      },
    ]

    return NextResponse.json(assignments)
  } catch (error) {
    console.error("[ASSIGNMENTS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// POST: /api/assignments - Submit an assignment (student)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { assignmentId, content } = body

    if (!assignmentId || !content) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // In a real app, this would submit the assignment to the database
    // const submission = await db.submission.create({
    //   data: {
    //     assignmentId,
    //     studentId: session.user.id,
    //     content,
    //   }
    // });

    return NextResponse.json({ message: "Assignment submitted" }, { status: 201 })
  } catch (error) {
    console.error("[ASSIGNMENTS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
