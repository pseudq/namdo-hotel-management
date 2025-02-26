"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[250px] border-r bg-background flex flex-col">
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
          HM
        </div>
        <span className="font-semibold">Hotel Management</span>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search"
            className="w-full pl-9 pr-4 py-2 bg-muted rounded-md text-sm"
          />
        </div>
      </div>

      <div className="px-2 space-y-1">
        <h3 className="px-4 text-xs font-medium text-muted-foreground mb-2">
          MAIN MENU
        </h3>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3",
            pathname === "/" && "bg-muted"
          )}
          asChild
        >
          <Link href="/">
            <Home className="h-4 w-4" />
            Trang chủ
          </Link>
        </Button>

        <div className="space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3",
              pathname.startsWith("/settings") && "bg-muted"
            )}
            asChild
          >
            <Link href="/settings/rooms">
              <Settings className="h-4 w-4" />
              Cài đặt phòng
            </Link>
          </Button>

          {pathname.startsWith("/settings") && (
            <div className="pl-8 space-y-1">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-8",
                  pathname === "/settings/rooms" && "bg-muted"
                )}
                asChild
              >
                <Link href="/settings/rooms">
                  <BedDouble className="h-4 w-4" />
                  Thêm phòng/tầng
                </Link>
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-8",
                  pathname === "/settings/prices" && "bg-muted"
                )}
                asChild
              >
                <Link href="/settings/prices">
                  <Tag className="h-4 w-4" />
                  Cài đặt giá phòng
                </Link>
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-8",
                  pathname === "/settings/services" && "bg-muted"
                )}
                asChild
              >
                <Link href="/settings/services">
                  <Coffee className="h-4 w-4" />
                  Cài đặt giá dịch vụ
                </Link>
              </Button>
            </div>
          )}
        </div>

        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/receipts">
            <FileText className="h-4 w-4" />
            Hóa đơn
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/reports">
            <BarChart2 className="h-4 w-4" />
            Báo cáo, thống kê
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/customers">
            <Users className="h-4 w-4" />
            Khách hàng
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/staff">
            <UserCircle className="h-4 w-4" />
            Nhân viên
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/notifications">
            <Bell className="h-4 w-4" />
            Thông báo
            <span className="ml-auto bg-red-500 text-white text-xs px-1.5 rounded-full">
              5
            </span>
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <MoreHorizontal className="h-4 w-4" />
          More
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
  );
}
