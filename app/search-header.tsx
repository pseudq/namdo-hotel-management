"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearch } from "./search-context"
import { useState, useEffect } from "react"

export default function SearchHeader() {
  const { searchTerm, setSearchTerm, searchFilter, setSearchFilter } = useSearch()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 min-w-[200px]"
        />
      </div>
      <Select value={searchFilter} onValueChange={(value: "all" | "guests" | "receipts") => setSearchFilter(value)}>
        <SelectTrigger className={isMobile ? "w-full" : "w-[180px]"}>
          <SelectValue placeholder="Tìm kiếm trong" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="guests">Khách hàng</SelectItem>
          <SelectItem value="receipts">Hóa đơn</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

