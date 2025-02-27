import type React from "react"
import { Sidebar } from "./sidebar"

interface PageContainerProps {
  children: React.ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      {/* Added padding-top for mobile to prevent overlap with toggle button */}
      <main className="flex-1 w-full lg:pl-[250px] pt-16 lg:pt-0">{children}</main>
    </div>
  )
}

