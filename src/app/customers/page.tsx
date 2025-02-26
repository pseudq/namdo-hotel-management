"use client";

import { useState } from "react";
import { Search, UserPlus, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AddCustomerModal } from "./add-customer-modal";

const currentGuests = [
  {
    id: 1,
    name: "Trần Bảo Ngọc",
    room: "001",
    checkIn: "06-03-2021",
    notes: "...",
  },
  {
    id: 2,
    name: "Sarah Martinez",
    room: "002",
    checkIn: "06-03-2021",
    notes: "...",
  },
  {
    id: 3,
    name: "Sarah Martinez",
    room: "003",
    checkIn: "06-03-2021",
    notes: "...",
  },
  {
    id: 4,
    name: "Sarah Martinez",
    room: "004",
    checkIn: "06-03-2021",
    notes: "...",
  },
];

const pastGuests = [
  {
    id: 1,
    name: "Matthew Wilson",
    stayCount: 3,
    lastStay: "06-03-2021",
  },
  {
    id: 2,
    name: "Sarah Martinez",
    stayCount: 1,
    lastStay: "06-03-2021",
  },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCurrentExpanded, setIsCurrentExpanded] = useState(true);
  const [isPastExpanded, setIsPastExpanded] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredCurrentGuests = currentGuests.filter((guest) =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPastGuests = pastGuests.filter((guest) =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý khách hàng</h1>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-zinc-900 text-white hover:bg-zinc-800"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Thêm khách hàng
          </Button>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[250px] bg-muted/50"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Collapsible
          open={isCurrentExpanded}
          onOpenChange={setIsCurrentExpanded}
          className="border rounded-lg"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50">
            <h2 className="text-lg font-medium">Khách đang ở</h2>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isCurrentExpanded ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Phòng</TableHead>
                  <TableHead>Ngày vào</TableHead>
                  <TableHead>Ghi chú</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCurrentGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">{guest.name}</TableCell>
                    <TableCell>{guest.room}</TableCell>
                    <TableCell>{guest.checkIn}</TableCell>
                    <TableCell>{guest.notes}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={isPastExpanded}
          onOpenChange={setIsPastExpanded}
          className="border rounded-lg"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50">
            <h2 className="text-lg font-medium">Khách đã ở</h2>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isPastExpanded ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Số lần ở</TableHead>
                  <TableHead>Lần cuối ở</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPastGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">{guest.name}</TableCell>
                    <TableCell>{guest.stayCount}</TableCell>
                    <TableCell>{guest.lastStay}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
