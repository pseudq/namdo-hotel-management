"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  {
    id: 4,
    name: "Trần Bảo Anh",
    idNumber: "572390788523",
    status: "Đang ở",
    date: "12 giờ 15, 9/1/2024",
    discount: 0,
    total: 1350000,
  },
  {
    id: 5,
    name: "Lê Thị Hoa",
    idNumber: "177126966868",
    status: "Đã trả phòng",
    date: "11 giờ 15, 9/1/2024",
    discount: 0,
    total: 350000,
  },
  {
    id: 6,
    name: "Vương Quốc Gia",
    idNumber: "624167138791",
    status: "Đã trả phòng",
    date: "11 giờ 15, 9/1/2024",
    discount: 0,
    total: 750000,
  },
  {
    id: 7,
    name: "Hoàng Yến",
    idNumber: "161510658100",
    status: "Đã trả phòng",
    date: "11 giờ 15, 9/1/2024",
    discount: 0,
    total: 350000,
  },
];

export default function ReceiptList() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT</TableHead>
            <TableHead>Tên khách hàng</TableHead>
            <TableHead>Số CCCD</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Khuyến mãi</TableHead>
            <TableHead className="text-right">Tổng tiền</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receipts.map((receipt) => (
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
              <TableCell>{receipt.discount.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                {receipt.total.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-2 border-t">
        <div>Tổng cộng 12 hóa đơn</div>
        <div className="flex items-center gap-2">
          <button className="p-2">&lt;</button>
          <span className="px-3 py-1 bg-primary text-primary-foreground rounded">
            1
          </span>
          <span>2</span>
          <span>...</span>
          <button className="p-2">&gt;</button>
        </div>
        <div>Tổng doanh thu: 4,300,000 VNĐ</div>
      </div>
    </div>
  );
}
