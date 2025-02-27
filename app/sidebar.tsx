"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Search,
  Home,
  Settings,
  FileText,
  BarChart2,
  Users,
  UserCircle,
  Bell,
  MoreHorizontal,
  Sun,
  HelpCircle,
  BedDouble,
  Tag,
  Coffee,
  ChevronRight,
  ChevronLeft,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const router = useRouter()

  // Check if we're on mobile and collapse sidebar by default
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setIsCollapsed(mobile)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile) {
      setIsMobileOpen(false)
    }
  }, [isMobile])

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      {isMobile && (
        <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50" onClick={toggleMobileSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div
        className={cn(
          "border-r bg-background flex flex-col fixed h-full z-40 transition-all duration-300",
          isCollapsed ? "w-[68px]" : "w-[250px]",
          isMobile && !isMobileOpen ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center md:flex hidden"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        <div className="p-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            HM
          </div>
          {!isCollapsed && <span className="font-semibold">Hotel Management</span>}
        </div>

        <div className={cn("p-4", isCollapsed && "px-2")}>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder={isCollapsed ? "" : "Search"}
              className={cn("w-full pl-9 pr-4 py-2 bg-muted rounded-md text-sm", isCollapsed && "w-8 h-8 p-0")}
            />
          </div>
        </div>

        <div className="px-2 space-y-1 overflow-y-auto flex-grow">
          {!isCollapsed && <h3 className="px-4 text-xs font-medium text-muted-foreground mb-2">MAIN MENU</h3>}

          <NavItem
            href="/"
            icon={<Home className="h-4 w-4" />}
            label="Trang chủ"
            isActive={pathname === "/"}
            isCollapsed={isCollapsed}
          />

          <div className="space-y-1">
            <NavItem
              href="/settings/rooms"
              icon={<Settings className="h-4 w-4" />}
              label="Cài đặt phòng"
              isActive={pathname.startsWith("/settings")}
              isCollapsed={isCollapsed}
            />

            {pathname.startsWith("/settings") && !isCollapsed && (
              <div className="pl-8 space-y-1">
                <NavItem
                  href="/settings/rooms"
                  icon={<BedDouble className="h-4 w-4" />}
                  label="Thêm phòng/tầng"
                  isActive={pathname === "/settings/rooms"}
                  isCollapsed={isCollapsed}
                />
                <NavItem
                  href="/settings/prices"
                  icon={<Tag className="h-4 w-4" />}
                  label="Cài đặt giá phòng"
                  isActive={pathname === "/settings/prices"}
                  isCollapsed={isCollapsed}
                />
                <NavItem
                  href="/settings/services"
                  icon={<Coffee className="h-4 w-4" />}
                  label="Cài đặt giá dịch vụ"
                  isActive={pathname === "/settings/services"}
                  isCollapsed={isCollapsed}
                />
              </div>
            )}
          </div>

          <NavItem
            href="/receipts"
            icon={<FileText className="h-4 w-4" />}
            label="Hóa đơn"
            isActive={pathname === "/receipts"}
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/reports"
            icon={<BarChart2 className="h-4 w-4" />}
            label="Báo cáo, thống kê"
            isActive={pathname === "/reports"}
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/customers"
            icon={<Users className="h-4 w-4" />}
            label="Khách hàng"
            isActive={pathname === "/customers"}
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/staff"
            icon={<UserCircle className="h-4 w-4" />}
            label="Nhân viên"
            isActive={pathname === "/staff"}
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/notifications"
            icon={<Bell className="h-4 w-4" />}
            label="Thông báo"
            isActive={pathname === "/notifications"}
            isCollapsed={isCollapsed}
            badge="5"
          />
          <Button variant="ghost" className={cn("w-full justify-start gap-3", isCollapsed && "justify-center px-2")}>
            <MoreHorizontal className="h-4 w-4" />
            {!isCollapsed && "More"}
          </Button>
        </div>

        <div className="mt-auto p-4 border-t flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <Sun className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
  isCollapsed?: boolean
  badge?: string
}

function NavItem({ href, icon, label, isActive, isCollapsed, badge }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start gap-3", isActive && "bg-muted", isCollapsed && "justify-center px-2")}
      asChild
    >
      <Link href={href}>
        {icon}
        {!isCollapsed && (
          <>
            {label}
            {badge && <span className="ml-auto bg-red-500 text-white text-xs px-1.5 rounded-full">{badge}</span>}
          </>
        )}
        {isCollapsed && badge && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {badge}
          </span>
        )}
      </Link>
    </Button>
  )
}

