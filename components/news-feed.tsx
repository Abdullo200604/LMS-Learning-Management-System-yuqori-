"use client"

import { useState, useEffect } from "react"
import { CalendarDays, Eye, ThumbsUp, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Alert, AlertTitle } from "@/components/ui/alert"

interface NewsItem {
  id: number
  title: string
  description: string
  date: string
  category: string
  views: number
  likes: number
}

export default function NewsFeed() {
  const [showAlert, setShowAlert] = useState(true)
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news")
        if (response.ok) {
          const data = await response.json()
          setNews(data)
        } else {
          console.error("Failed to fetch news")
        }
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleLikeNews = async (id: number) => {
    setNews((prev) => prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item)))
  }

  return (
    <div className="space-y-6">
      {showAlert && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTitle className="text-amber-800 flex items-center justify-between">
            <span>Fan tanlov jarayoni yakunlandi.</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-amber-800"
              onClick={() => setShowAlert(false)}
            >
              ×
            </Button>
          </AlertTitle>
        </Alert>
      )}

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-16 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-5 w-24 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="h-6 w-3/4 mt-2 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-full mt-2 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 mt-1 animate-pulse rounded bg-gray-200"></div>
              </CardHeader>
              <CardContent>
                <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-4">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-emerald-100 group">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      {item.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      {item.date}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 text-xl group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="default"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
                  >
                    Batafsil
                  </Button>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center group-hover:text-emerald-600 transition-colors">
                      <Eye className="mr-1 h-4 w-4" />
                      {item.views}
                    </div>
                    <div
                      className="flex items-center group-hover:text-emerald-600 transition-colors cursor-pointer"
                      onClick={() => handleLikeNews(item.id)}
                    >
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {item.likes}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50"
                  >
                    <Share2 className="mr-1 h-4 w-4" />
                    Ulashish
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="w-8 h-8 p-0">
            Avvalgi
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0 bg-emerald-700 text-white">
            1
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0">
            Keyingi
          </Button>
        </div>
      </div>
    </div>
  )
}
