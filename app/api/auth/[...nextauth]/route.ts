import { PrismaAdapter } from "@auth/prisma-adapter"
import type { PrismaClient } from "@prisma/client"
import NextAuth, { type AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db as unknown as PrismaClient),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          // Demo user check - in real app replace with DB query
          if (
            (credentials.username === "demo_student" && credentials.password === "tatu2025") ||
            (credentials.username === "demo_teacher" && credentials.password === "tatu2025")
          ) {
            const isTeacher = credentials.username === "demo_teacher"

            return {
              id: isTeacher ? "teacher-1" : "student-1",
              name: isTeacher ? "Demo O'qituvchi" : "Demo Talaba",
              email: isTeacher ? "teacher@tuit.uz" : "student@tuit.uz",
              role: isTeacher ? "TEACHER" : "STUDENT",
              image: isTeacher ? "/teacher-avatar.png" : "/student-avatar.png",
            }
          }

          return null
        } catch (error) {
          console.log("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.picture = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.image = token.picture as string
      }
      return session
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
