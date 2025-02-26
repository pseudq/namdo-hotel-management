"use client";

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
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
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
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Home className="h-4 w-4" />
          Trang chủ
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="h-4 w-4" />
          Cài đặt phòng
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <FileText className="h-4 w-4" />
          Hóa đơn
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <BarChart2 className="h-4 w-4" />
          Báo cáo, thống kê
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Users className="h-4 w-4" />
          Khách hàng
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <UserCircle className="h-4 w-4" />
          Nhân viên
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Bell className="h-4 w-4" />
          Thông báo
          <span className="ml-auto bg-red-500 text-white text-xs px-1.5 rounded-full">
            5
          </span>
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
