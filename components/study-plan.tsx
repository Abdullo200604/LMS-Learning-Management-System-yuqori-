"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StudyPlan() {
  // Sample study plan data
  const semesters = [
    {
      id: "i-semestr",
      name: "I semestr",
      subjects: [
        { name: "Jismoniy tarbiya", credits: 0, grade: 4 },
        { name: "Dasturlash I", credits: 6, grade: 4 },
        { name: "Fizika I", credits: 6, grade: 4 },
        { name: "Hisob (Calculus)", credits: 8, grade: 4 },
        { name: "Ingliz tili I", credits: 4, grade: 4 },
        { name: "Akademik yozuv I", credits: 2, grade: 5 },
        { name: "Falsafa I", credits: 4, grade: 4 },
      ],
    },
    {
      id: "ii-semestr",
      name: "II semestr",
      subjects: [
        { name: "O'zbekiston tarixi I", credits: 4, grade: 5 },
        { name: "Akademik yozuv 2", credits: 2, grade: 5 },
        { name: "Ingliz tili 2", credits: 4, grade: 5 },
        { name: "Differensial tenglamalar", credits: 4, grade: 4 },
        { name: "Chiziqli algebra", credits: 4, grade: 5 },
        { name: "Fizika II", credits: 6, grade: 5 },
        { name: "Dasturlash II", credits: 6, grade: 5 },
        { name: "Jismoniy tarbiya II", credits: 0, grade: 0 },
      ],
    },
    {
      id: "iii-semestr",
      name: "III semestr",
      subjects: [
        { name: "Elektrotexnika asoslari", credits: 6, grade: 4 },
        { name: "Ma'lumotlar tuzilmasi va algoritmlar", credits: 6, grade: 4 },
        { name: "Elektronika va sxemalar 1", credits: 6, grade: 4 },
        { name: "Diskret tuzilmalar", credits: 6, grade: 4 },
        { name: "Web dasturlashga kirish", credits: 6, grade: 4 },
      ],
    },
    {
      id: "iv-semestr",
      name: "IV semestr",
      subjects: [
        { name: "Kompyuterli tarjima", credits: 6, grade: 4 },
        { name: "Tizimlarga signallash qayta ishlash", credits: 6, grade: 4 },
        { name: "Kompyuter arxitekturasi", credits: 6, grade: 4 },
        { name: "Raqamli qurilmalarni loyihalashga kirish", credits: 6, grade: 4 },
        { name: "Pedagogika, Psixologiya", credits: 4, grade: 4 },
        { name: "Individual loyiha 1", credits: 2, grade: 4 },
      ],
    },
    {
      id: "v-semestr",
      name: "V semestr",
      subjects: [
        { name: "Parallel kompyuter arxitekturasi va dasturlash", credits: 6, grade: 3 },
        { name: "Kompyuter modellashtirish", credits: 6, grade: 4 },
        { name: "Geoinformatsion texnologiyalar", credits: 6, grade: 4 },
        { name: "Mobil ilovalarni ishlab chiqish", credits: 6, grade: 4 },
        { name: "Individual loyiha 1", credits: 2, grade: 4 },
      ],
    },
    {
      id: "vi-semestr",
      name: "VI semestr",
      subjects: [
        { name: "Operatsion tizimlar (4 kr)", credits: 4, grade: 4 },
        { name: "O'rnatilgan tizimlar", credits: 6, grade: 4 },
        { name: "Mashinali o'rganish kirish", credits: 6, grade: 4 },
        { name: "Tarmoq haqfizligi", credits: 6, grade: 4 },
        { name: "Infokommunikatsiya tizimlarining elektr ta'minoti", credits: 4, grade: 4 },
        { name: "Individual loyiha 2", credits: 2, grade: 4 },
        { name: "Ishlab chiqarish amaliyoti", credits: 2, grade: 4 },
      ],
    },
    {
      id: "vii-semestr",
      name: "VII semestr",
      subjects: [
        { name: "Parallel kompyuter arxitekturasi va dasturlash", credits: 6, grade: 3 },
        { name: "Kompyuter modellashtirish", credits: 6, grade: 4 },
        { name: "Geoinformatsion texnologiyalar", credits: 6, grade: 4 },
        { name: "Mobil ilovalarni ishlab chiqish", credits: 6, grade: 4 },
        { name: "Ma'lumotlarning intellektual tahlili", credits: 6, grade: 3 },
      ],
    },
    {
      id: "viii-semestr",
      name: "VIII semestr",
      subjects: [
        { name: "Katta ma'lumotlarni qayta ishlash texnologiyalari va usullari", credits: 6, grade: 4 },
        { name: "Multiagent tizimlar", credits: 4, grade: 3 },
        { name: "Bitiruv malakaviy ishi oldi amaliyoti", credits: 2, grade: 0 },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-900">Individual shaxsiy reja</h1>
        <div className="text-sm text-gray-500">GPA: 4.3</div>
      </div>

      <Tabs defaultValue="i-semestr">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="i-semestr">I-II semestr</TabsTrigger>
          <TabsTrigger value="iii-semestr">III-IV semestr</TabsTrigger>
          <TabsTrigger value="v-semestr">V-VI semestr</TabsTrigger>
          <TabsTrigger value="vii-semestr">VII-VIII semestr</TabsTrigger>
        </TabsList>

        {[0, 2, 4, 6].map((index) => (
          <TabsContent key={index} value={semesters[index].id} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First semester in the pair */}
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">{semesters[index].name}</div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fan</TableHead>
                      <TableHead className="w-20 text-center">Kredit</TableHead>
                      <TableHead className="w-20 text-center">Olingan baho</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {semesters[index].subjects.map((subject, i) => (
                      <TableRow key={i}>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell className="text-center">{subject.credits}</TableCell>
                        <TableCell className="text-center">{subject.grade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Second semester in the pair */}
              {semesters[index + 1] && (
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-gray-50 p-3 font-medium border-b">{semesters[index + 1].name}</div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fan</TableHead>
                        <TableHead className="w-20 text-center">Kredit</TableHead>
                        <TableHead className="w-20 text-center">Olingan baho</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {semesters[index + 1].subjects.map((subject, i) => (
                        <TableRow key={i}>
                          <TableCell>{subject.name}</TableCell>
                          <TableCell className="text-center">{subject.credits}</TableCell>
                          <TableCell className="text-center">{subject.grade}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
