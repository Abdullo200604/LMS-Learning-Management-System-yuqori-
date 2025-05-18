import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// GET: /api/schedule - Retrieve schedule data
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Simulated schedule data
    const schedule = [
      {
        day: "Dush",
        classes: [],
      },
      {
        day: "Sesh",
        classes: [],
      },
      {
        day: "Chor",
        classes: [],
      },
      {
        day: "Pay",
        classes: [
          {
            time: "11:00",
            subject: "BMI (Lab)",
            teacher: "Multiagent tizimlar-MAS001-1",
            room: "SD-201",
            type: "Lab",
          },
          {
            time: "12:00",
            subject: "BMI (Lab)",
            teacher: "Multiagent tizimlar-MAS001",
            room: "SD-201",
            type: "Lab",
          },
          {
            time: "14:00",
            subject: "BMI (Lab)",
            teacher: "Katta ma'lumotlarni qayta ishlash texnologiyalari va usullari-SD-001",
            room: "SD-201",
            type: "Lab",
          },
        ],
      },
      {
        day: "Ju",
        classes: [
          {
            time: "09:00",
            subject: "BMI (Lab)",
            teacher: "Katta ma'lumotlarni qayta ishlash texnologiyalari va usullari-SD-001",
            room: "SD-201",
            type: "Lab",
          },
          {
            time: "10:00",
            subject: "BMI (Lab)",
            teacher: "Katta ma'lumotlarni qayta ishlash texnologiyalari va usullari-SD-001",
            room: "SD-201",
            type: "Lab",
          },
          {
            time: "11:00",
            subject: "BMI (Lab)",
            teacher: "Katta ma'lumotlarni qayta ishlash texnologiyalari va usullari-SD-001",
            room: "SD-201",
            type: "Lab",
          },
          {
            time: "12:00",
            subject: "BMI (Lab)",
            teacher: "Katta ma'lumotlarni qayta ishlash texnologiyalari va usullari-SD-001",
            room: "SD-201",
            type: "Lab",
          },
        ],
      },
      {
        day: "Sha",
        classes: [],
      },
    ]

    return NextResponse.json(schedule)
  } catch (error) {
    console.error("[SCHEDULE_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
