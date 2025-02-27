import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ToastProvider } from "@/contexts/toast-context"
import { HotelProvider } from "@/contexts/hotel-context"
import { SidebarProvider } from "@/components/sidebar-provider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hotel Management System</title>
      </head>
      <body className={`${inter.className} h-full`}>
        <HotelProvider>
          <ToastProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ToastProvider>
        </HotelProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
