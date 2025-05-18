import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// GET: /api/students - Retrieve students (teacher only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "TEACHER") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Simulated students data
    const students = [
      {
        id: 1,
        name: "Aljonov Azamjon",
        group: "210-21",
        courses: ["MAS001", "BDP001"],
        attendance: 92,
        performance: 85,
        status: "active",
      },
      {
        id: 2,
        name: "Karimov Abdulatif",
        group: "210-21",
        courses: ["MAS001", "BDP001"],
        attendance: 88,
        performance: 78,
        status: "active",
      },
      {
        id: 3,
        name: "Javliyev Shahzod",
        group: "210-22",
        courses: ["MAS001"],
        attendance: 95,
        performance: 92,
        status: "active",
      },
      {
        id: 4,
        name: "Xusanov Sherzod",
        group: "210-22",
        courses: ["BDP001"],
        attendance: 85,
        performance: 75,
        status: "active",
      },
      {
        id: 5,
        name: "Abdurazzogov Faxriddin",
        group: "210-23",
        courses: ["BDP001"],
        attendance: 78,
        performance: 68,
        status: "warning",
      },
      {
        id: 6,
        name: "Bekpo'latov Sardor",
        group: "210-23",
        courses: ["MAS001", "BDP001"],
        attendance: 65,
        performance: 60,
        status: "warning",
      },
      {
        id: 7,
        name: "Toshmatov Jasur",
        group: "110-21",
        courses: ["CALC101", "PHYS101"],
        attendance: 90,
        performance: 88,
        status: "active",
      },
      {
        id: 8,
        name: "Ergashev Bobur",
        group: "110-21",
        courses: ["CALC101", "PHYS101"],
        attendance: 93,
        performance: 90,
        status: "active",
      },
    ]

    return NextResponse.json(students)
  } catch (error) {
    console.error("[STUDENTS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
