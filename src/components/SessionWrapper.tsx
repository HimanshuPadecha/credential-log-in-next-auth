"use client"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface appProps{
    children: ReactNode
}
export default function sessionProvider({children}:appProps) {
  return (
    <SessionProvider>
     {children}
    </SessionProvider>
  )
}