"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("demo_student")
  const [password, setPassword] = useState("tatu2025")
  const [isLoading, setIsLoading] = useState(false)
  const [loginType, setLoginType] = useState<"student" | "teacher">("student")
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would call a server action to authenticate
      const response = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginType === "teacher" ? "demo_teacher" : username,
          password,
        }),
      })

      if (response.ok) {
        toast({
          title: "Tizimga kirish",
          description: "Siz muvaffaqiyatli tizimga kirdingiz!",
          variant: "default",
        })

        // Redirect based on role
        if (loginType === "teacher") {
          router.push("/teacher")
        } else {
          router.push("/dashboard/news")
        }
      } else {
        toast({
          title: "Xatolik",
          description: "Login yoki parol noto'g'ri",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Tizimga kirishda xatolik yuz berdi",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side with illustration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-1 items-center justify-center bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-8"
      >
        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-xl bg-white/10 p-6 backdrop-blur-sm shadow-xl"
          >
            <Image
              src="/placeholder-806z2.png"
              alt="Student studying"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold">Ta'lim boshqaruv tizimi</h2>
            <p className="mt-2 text-teal-200">
              Bilim olish va o'qitish jarayonini samarali boshqarish uchun zamonaviy platforma
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
          <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl"></div>
          <div className="absolute top-1/3 -right-24 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"></div>
        </div>
      </motion.div>

      {/* Right side with login form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-1 flex-col items-center justify-center bg-white p-8"
      >
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <div className="mx-auto h-20 w-20">
              <Image src="/placeholder-12t4q.png" alt="University Logo" width={80} height={80} className="mx-auto" />
            </div>
            <h1 className="mt-4 text-center text-xl font-bold uppercase tracking-tight text-gray-900">
              Muhammad Al-Xorazmiy nomidagi
            </h1>
            <h2 className="text-center text-lg font-medium uppercase tracking-tight text-gray-900">
              Toshkent Axborot Texnologiyalari
            </h2>
            <h2 className="text-center text-lg font-medium uppercase tracking-tight text-gray-900">Universiteti</h2>
            <motion.h3
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-center text-xl font-bold tracking-tight text-emerald-600"
            >
              TA'LIM BOSHQARUV TIZIMI
            </motion.h3>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Kirish rejimi</span>
            </div>
          </motion.div>

          <div className="flex space-x-2">
            <Button
              type="button"
              variant={loginType === "student" ? "default" : "outline"}
              className={`w-1/2 ${loginType === "student" ? "bg-gradient-to-r from-emerald-500 to-teal-600" : ""}`}
              onClick={() => setLoginType("student")}
            >
              Talaba
            </Button>
            <Button
              type="button"
              variant={loginType === "teacher" ? "default" : "outline"}
              className={`w-1/2 ${loginType === "teacher" ? "bg-gradient-to-r from-emerald-500 to-teal-600" : ""}`}
              onClick={() => setLoginType("teacher")}
            >
              O'qituvchi
            </Button>
          </div>

          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 space-y-6"
            onSubmit={handleLogin}
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="login">Login</Label>
                <Input
                  id="login"
                  name="login"
                  type="text"
                  placeholder="Loginni kiriting"
                  required
                  className="mt-1 border-emerald-200 focus-visible:ring-emerald-500"
                  value={loginType === "teacher" ? "demo_teacher" : username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loginType === "teacher"}
                />
              </div>
              <div>
                <Label htmlFor="password">Parol</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolni kiriting"
                    required
                    className="pr-10 border-emerald-200 focus-visible:ring-emerald-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Eslab qolish
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                    Parolni unutdingizmi?
                  </a>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="group relative w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 ease-in-out"
              disabled={isLoading}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-emerald-300 group-hover:text-emerald-200" />
              </span>
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Kirish...
                </div>
              ) : (
                "Kirish"
              )}
            </Button>
          </motion.form>

          <div className="mt-6 text-center text-sm text-gray-500">
            &copy; 2025 Toshkent Axborot Texnologiyalari Universiteti
          </div>
        </div>
      </motion.div>
    </div>
  )
}
