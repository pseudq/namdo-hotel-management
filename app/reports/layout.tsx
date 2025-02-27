import type React from "react"
import { PageContainer } from "@/components/page-container"

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PageContainer>{children}</PageContainer>
}

