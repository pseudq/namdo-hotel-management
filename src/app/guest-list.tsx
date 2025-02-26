"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearch } from "./search-context";

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
  const { searchTerm, searchFilter } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredGuests = useMemo(() => {
    if (!searchTerm || (searchFilter !== "all" && searchFilter !== "guests")) {
      return guests;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    return guests.filter(
      (guest) =>
        guest.name.toLowerCase().includes(lowercasedTerm) ||
        guest.idNumber.includes(searchTerm) ||
        guest.room.includes(searchTerm)
    );
  }, [searchTerm, searchFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGuests.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          {currentItems.length > 0 ? (
            currentItems.map((guest) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                Không tìm thấy khách hàng nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-2 border-t">
        <div>Tổng cộng {filteredGuests.length} khách hàng</div>
        <div className="flex items-center gap-2">
          <button
            className={`p-2 ${
              currentPage === 1 ? "text-gray-300" : "cursor-pointer"
            }`}
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <span
                key={pageNumber}
                className={`px-3 py-1 ${
                  currentPage === pageNumber
                    ? "bg-primary text-primary-foreground rounded"
                    : "cursor-pointer"
                }`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </span>
            );
          })}
          {totalPages > 3 && <span>...</span>}
          <button
            className={`p-2 ${
              currentPage === totalPages ? "text-gray-300" : "cursor-pointer"
            }`}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
