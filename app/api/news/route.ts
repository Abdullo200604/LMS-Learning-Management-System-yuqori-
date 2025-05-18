import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulated news data
    const news = [
      {
        id: 1,
        title: "Hurmatli 4-bosqich talabalari!",
        description: "Hurmatli 4-bosqich talabalari!",
        date: "26.04.2025",
        category: "E'lon",
        views: 1245,
        likes: 89,
      },
      {
        id: 2,
        title: "Hurmatli 1-bosqich talabalari!",
        description: "Hurmatli 1-bosqich talabalari!",
        date: "03.01.2025",
        category: "E'lon",
        views: 856,
        likes: 42,
      },
      {
        id: 3,
        title: "Hurmatli qayta o'qishda o'qiyotgan talabalar diqqatiga!",
        description: "Hurmatli qayta o'qishda o'qiyotgan talabalar diqqatiga!",
        date: "19.07.2024",
        category: "E'lon",
        views: 1567,
        likes: 124,
      },
      {
        id: 4,
        title: "Qayta o'qish",
        description: "Qayta o'qish",
        date: "11.07.2024",
        category: "E'lon",
        views: 1245,
        likes: 89,
      },
      {
        id: 5,
        title: "Qayta o'qishda qatnashish shart!",
        description: "Qayta o'qishda qatnashish shart!",
        date: "01.07.2024",
        category: "E'lon",
        views: 856,
        likes: 42,
      },
      {
        id: 6,
        title: "Yakuniy nazorat",
        description: "Yakuniy nazorat",
        date: "31.05.2024",
        category: "E'lon",
        views: 1567,
        likes: 124,
      },
      {
        id: 7,
        title: "YAKUNIY NAZORAT IMTIHONLARINI O'TKAZISH QOIDALARI",
        description: "YAKUNIY NAZORAT IMTIHONLARINI O'TKAZISH QOIDALARI",
        date: "13.01.2024",
        category: "E'lon",
        views: 1245,
        likes: 89,
      },
      {
        id: 8,
        title: "Qayta o'qish",
        description: "Qayta o'qish",
        date: "21.06.2024",
        category: "E'lon",
        views: 856,
        likes: 42,
      },
    ]

    return NextResponse.json(news)
  } catch (error) {
    console.error("[NEWS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
