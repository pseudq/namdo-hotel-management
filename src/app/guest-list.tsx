"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const guests = [
  {
    id: 1,
    name: "Trần Bảo Ngọc",
    idNumber: "036420024891123",
    room: "003",
    date: "7 giờ 15, 9/1/2024",
    status: "Đang ở",
  },
  {
    id: 2,
    name: "Trần Văn A",
    idNumber: "012345678912345",
    room: "004",
    date: "7 giờ 15, 9/1/2024",
    status: "Đã trả phòng",
  },
  {
    id: 3,
    name: "Trần Văn B",
    idNumber: "012345678912345",
    room: "003",
    date: "7 giờ 15, 9/1/2024",
    status: "Đang ở",
  },
  {
    id: 4,
    name: "Trần Văn C",
    idNumber: "012345678912345",
    room: "004",
    date: "7 giờ 15, 9/1/2024",
    status: "Đang ở",
  },
  {
    id: 5,
    name: "Trần Văn D",
    idNumber: "012345678912345",
    room: "006",
    date: "7 giờ 15, 9/1/2024",
    status: "Đã trả phòng",
  },
  {
    id: 6,
    name: "Trần Văn E",
    idNumber: "012345678912345",
    room: "101",
    date: "7 giờ 15, 9/1/2024",
    status: "Đặt trước",
  },
  {
    id: 7,
    name: "Trần Văn F",
    idNumber: "012345678912345",
    room: "201",
    date: "10 giờ 15, 9/1/2024",
    status: "Đang ở",
  },
];

export default function GuestList() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT</TableHead>
            <TableHead>Tên khách hàng</TableHead>
            <TableHead>Số CCCD</TableHead>
            <TableHead>Phòng</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Tình trạng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow key={guest.id}>
              <TableCell>{guest.id}</TableCell>
              <TableCell>{guest.name}</TableCell>
              <TableCell>{guest.idNumber}</TableCell>
              <TableCell>{guest.room}</TableCell>
              <TableCell>{guest.date}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    guest.status === "Đang ở"
                      ? "bg-green-100 text-green-700"
                      : guest.status === "Đặt trước"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {guest.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-2 border-t">
        <div>Tổng cộng 11 khách hàng</div>
        <div className="flex items-center gap-2">
          <button className="p-2">&lt;</button>
          <span className="px-3 py-1 bg-primary text-primary-foreground rounded">
            1
          </span>
          <span>2</span>
          <span>...</span>
          <button className="p-2">&gt;</button>
        </div>
      </div>
    </div>
  );
}
