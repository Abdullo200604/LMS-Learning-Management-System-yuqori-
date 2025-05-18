"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

export default function StudentProfile() {
  // Sample student data
  const student = {
    id: "F.I.SH",
    name: "Aljonov Azamjon Maxmudjonov o'g'li",
    birthDate: "23.03.2003",
    gender: "Erkak",
    faculty: "Kompyuter injiniringi",
    department: "Dasturiy ta'minot",
    course: 4,
    group: "210-21",
    address: "Namangan viloyati, Toraqo'rg'on tumani, Burmatut MPV",
    phone: "Toshkent shahri, Navoiobod tumani, A.Temur ko'chasi, 117 A uy, 3-a xona",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-900">Ma'lumot</h1>
        <Button variant="outline" className="gap-2">
          <Pencil className="h-4 w-4" />
          Tahrirlash
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        <div className="flex flex-col items-center">
          <div className="border rounded-md overflow-hidden w-full max-w-[200px] aspect-square">
            <Image
              src="/student-profile.png"
              alt="Student"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <Button variant="outline" className="mt-4 w-full max-w-[200px]">
            Rasmni o'zgartirish
          </Button>
        </div>

        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg">Shaxsiy ma'lumotlar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="grid grid-cols-[150px_1fr] py-3 px-4">
                <div className="text-gray-500">Yo'nalish:</div>
                <div className="font-medium">Kompyuter injiniringi</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-3 px-4">
                <div className="text-gray-500">O'qish tili:</div>
                <div className="font-medium">Uzbek</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-3 px-4">
                <div className="text-gray-500">Ta'lim shakli:</div>
                <div className="font-medium">Kunduzgi</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-3 px-4">
                <div className="text-gray-500">Kurs:</div>
                <div className="font-medium">4</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-3 px-4">
                <div className="text-gray-500">Guruh:</div>
                <div className="font-medium">210-21 Kurs</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-3 px-4">
                <div className="text-gray-500">Jinsi:</div>
                <div className="font-medium">Erkak</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-3 px-4">
                <div className="text-gray-500">Tug'ilgan sanasi:</div>
                <div className="font-medium">23.03.2003</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-3 px-4">
                <div className="text-gray-500">Stipendiya:</div>
                <div className="font-medium">Bor</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-3 px-4">
                <div className="text-gray-500">Manzil:</div>
                <div className="font-medium">Namangan viloyati, Toraqo'rg'on tumani, Burmatut MPV</div>
              </div>
              <div className="grid grid-cols-[150px_1fr] py-3 px-4">
                <div className="text-gray-500">Manzil (yashash):</div>
                <div className="font-medium">
                  Toshkent shahri, Navoiobod tumani, A.Temur ko'chasi, 117 A uy, 3-a xona
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
