"use client"

import { useCallback, useState } from "react"
import { FileDown, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const receipts = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    idNumber: "967067798886",
    status: "Đặt trước",
    date: "20 giờ 15, 9/1/2024",
    discount: 0,
    total: 350000,
  },
  {
    id: 2,
    name: "Nguyễn Văn Bư",
    idNumber: "395449560297",
    status: "Đang ở",
    date: "20 giờ 15, 9/1/2024",
    discount: 50000,
    total: 300000,
  },
  {
    id: 3,
    name: "Lê Văn Tú",
    idNumber: "911517199082",
    status: "Đã trả phòng",
    date: "13 giờ 15, 9/1/2024",
    discount: 0,
    total: 500000,
  },
  // ... more receipt data
]

export default function ReceiptsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [dateFilter, setDateFilter] = useState("all")
  const itemsPerPage = 10

  const filteredReceipts = receipts.filter(
    (receipt) => receipt.name.toLowerCase().includes(searchTerm.toLowerCase()) || receipt.idNumber.includes(searchTerm),
  )

  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage)
  const currentReceipts = filteredReceipts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalRevenue = filteredReceipts.reduce((sum, receipt) => sum + receipt.total, 0)

  const handleExportExcel = useCallback(() => {
    // Implement Excel export logic
    console.log("Exporting to Excel...")
  }, [])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-semibold">Danh sách Hoá đơn</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Button
            variant="secondary"
            className="bg-zinc-900 text-white hover:bg-zinc-800"
            onClick={handleExportExcel}
            size="sm"
          >
            <FileDown className="h-4 w-4 mr-2" />
            <span className="whitespace-nowrap">Xuất file Excel</span>
          </Button>

          <div className="flex items-center gap-2 bg-muted/50 rounded-md pl-3">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px] border-0 bg-transparent">
                <SelectValue placeholder="Theo ngày" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-[250px] bg-muted/50"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">STT</TableHead>
              <TableHead>
                <span className="line-clamp-1">Tên khách hàng</span>
              </TableHead>
              <TableHead>
                <span className="line-clamp-1">Số CCCD</span>
              </TableHead>
              <TableHead>
                <span className="whitespace-nowrap">Tình trạng</span>
              </TableHead>
              <TableHead>
                <span className="line-clamp-1">Ngày tạo</span>
              </TableHead>
              <TableHead className="text-right">
                <span className="line-clamp-1">Khuyến mãi</span>
              </TableHead>
              <TableHead className="text-right">
                <span className="whitespace-nowrap">Tổng tiền</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentReceipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell>{receipt.id}</TableCell>
                <TableCell>{receipt.name}</TableCell>
                <TableCell>{receipt.idNumber}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      receipt.status === "Đang ở"
                        ? "bg-green-100 text-green-700"
                        : receipt.status === "Đặt trước"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {receipt.status}
                  </span>
                </TableCell>
                <TableCell>{receipt.date}</TableCell>
                <TableCell className="text-right">{receipt.discount.toLocaleString()}</TableCell>
                <TableCell className="text-right">{receipt.total.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-2 border-t">
          <div>Tổng cộng {filteredReceipts.length} hoá đơn</div>
          <div className="flex items-center gap-2">
            <button
              className={`p-2 ${currentPage === 1 ? "text-gray-300" : "cursor-pointer"}`}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              const pageNumber = i + 1
              return (
                <span
                  key={pageNumber}
                  className={`px-3 py-1 ${
                    currentPage === pageNumber ? "bg-primary text-primary-foreground rounded" : "cursor-pointer"
                  }`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </span>
              )
            })}
            {totalPages > 3 && <span>...</span>}
            <button
              className={`p-2 ${currentPage === totalPages ? "text-gray-300" : "cursor-pointer"}`}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
          <div>Tổng doanh thu: {totalRevenue.toLocaleString()} VNĐ</div>
        </div>
      </div>
    </div>
  )
}

