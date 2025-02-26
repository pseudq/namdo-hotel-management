"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckInModal, type CheckInData } from "@/components/check-in-modal";
import { AddServiceModal } from "@/components/add-service-modal";
import { CheckOutModal } from "@/components/check-out-modal";

// Define room status types for better type safety
type RoomStatus = "vacant" | "occupied" | "cleaning" | "reserved";

type Room = {
  id: string;
  status: RoomStatus;
  time?: string;
};

interface RoomWithGuest extends Room {
  guestName?: string;
  idNumber?: string;
  services?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

// Generate rooms for each floor
const generateRoomsForFloor = (floor: number): RoomWithGuest[] => {
  const prefix = floor === 0 ? "00" : `${floor}0`;
  return Array.from({ length: 6 }, (_, i) => {
    const roomNumber = `${prefix}${i + 1}`;
    // Randomize initial status for demonstration
    const statuses: RoomStatus[] = [
      "vacant",
      "occupied",
      "cleaning",
      "reserved",
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      id: roomNumber,
      status: randomStatus,
      time:
        randomStatus === "occupied"
          ? `${Math.floor(Math.random() * 8) + 1} giờ`
          : undefined,
    } as RoomWithGuest;
  });
};

// Create initial room data for all floors
const initialRoomsByFloor = [
  generateRoomsForFloor(0), // Ground floor
  generateRoomsForFloor(1), // 1st floor
  generateRoomsForFloor(2), // 2nd floor
];

const getStatusColor = (status: RoomStatus) => {
  switch (status) {
    case "vacant":
      return "bg-green-200 text-green-700 border-green-300";
    case "reserved":
      return "bg-yellow-200 text-yellow-700 border-yellow-300";
    case "cleaning":
      return "bg-yellow-200 text-yellow-700 border-yellow-300";
    case "occupied":
      return "bg-red-200 text-red-700 border-red-300";
    default:
      return "bg-gray-200 text-gray-700 border-gray-300";
  }
};

const getStatusText = (status: RoomStatus) => {
  switch (status) {
    case "vacant":
      return "Đang trống";
    case "reserved":
      return "Đang đơn đẹp";
    case "cleaning":
      return "Đang dọn dẹp";
    case "occupied":
      return "Đang ở";
    default:
      return status;
  }
};

interface RoomGridProps {
  floor: number;
}

export default function RoomGrid({ floor = 0 }: RoomGridProps) {
  const [roomsByFloor, setRoomsByFloor] = useState<RoomWithGuest[][]>(
    initialRoomsByFloor as RoomWithGuest[][]
  );

  // Check-in modal state
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");

  // Add service modal state
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomWithGuest | null>(null);

  // Check-out modal state
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  // Open check-in modal
  const openCheckInModal = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsCheckInOpen(true);
  };

  // Open add service modal
  const openAddServiceModal = (room: RoomWithGuest) => {
    setSelectedRoom(room);
    setIsAddServiceOpen(true);
  };

  // Open check-out modal
  const openCheckOutModal = (room: RoomWithGuest) => {
    setSelectedRoom(room);
    setIsCheckOutOpen(true);
  };

  // Handle check-in process
  const handleCheckIn = (data: CheckInData) => {
    setRoomsByFloor((prevRoomsByFloor) => {
      const newRoomsByFloor = [...prevRoomsByFloor];
      newRoomsByFloor[floor] = prevRoomsByFloor[floor].map((room) =>
        room.id === data.roomId
          ? {
              ...room,
              status: "occupied",
              time: "0 giờ",
              guestName: data.guestName,
              idNumber: data.idNumber,
              services: [],
            }
          : room
      );
      return newRoomsByFloor;
    });

    setIsCheckInOpen(false);
  };

  // Handle adding services
  const handleAddServices = (
    services: Array<{ id: string; name: string; quantity: number }>
  ) => {
    if (!selectedRoom) return;

    setRoomsByFloor((prevRoomsByFloor) => {
      const newRoomsByFloor = [...prevRoomsByFloor];
      newRoomsByFloor[floor] = prevRoomsByFloor[floor].map((room) =>
        room.id === selectedRoom.id
          ? {
              ...room,
              services: [
                ...(room.services || []),
                ...services.map((service) => ({
                  name: service.name,
                  quantity: service.quantity,
                  price: 70000, // This would normally come from your service price configuration
                })),
              ],
            }
          : room
      );
      return newRoomsByFloor;
    });
  };

  // Handle check-out process
  const handleCheckOut = () => {
    if (!selectedRoom) return;

    setRoomsByFloor((prevRoomsByFloor) => {
      const newRoomsByFloor = [...prevRoomsByFloor];
      newRoomsByFloor[floor] = prevRoomsByFloor[floor].map((room) =>
        room.id === selectedRoom.id
          ? {
              ...room,
              status: "cleaning",
              time: undefined,
              guestName: undefined,
              idNumber: undefined,
              services: undefined,
            }
          : room
      );
      return newRoomsByFloor;
    });
  };

  const handleStatusChange = (roomId: string, newStatus: RoomStatus) => {
    setRoomsByFloor((prevRoomsByFloor) => {
      const newRoomsByFloor = [...prevRoomsByFloor];
      newRoomsByFloor[floor] = prevRoomsByFloor[floor].map((room) =>
        room.id === roomId
          ? {
              ...room,
              status: newStatus,
            }
          : room
      );
      return newRoomsByFloor;
    });
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        {roomsByFloor[floor].map((room) => (
          <div
            key={room.id}
            className={`relative p-4 rounded-lg shadow-sm border ${getStatusColor(
              room.status
            )}`}
          >
            <div className="flex justify-between items-start">
              <span className="text-sm">{getStatusText(room.status)}</span>
              {room.time && <span className="text-sm">{room.time}</span>}
            </div>
            <div className="text-3xl font-bold mt-4 mb-2">{room.id}</div>
            {room.guestName && (
              <div className="text-xs mt-1 mb-4">
                <p className="truncate">KH: {room.guestName}</p>
                <p className="truncate">CCCD: {room.idNumber}</p>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute bottom-2 right-2 h-6 w-6 p-0"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {room.status === "vacant" && (
                  <>
                    <DropdownMenuItem onClick={() => openCheckInModal(room.id)}>
                      Nhận phòng
                    </DropdownMenuItem>
                    <DropdownMenuItem>Báo cáo sự cố</DropdownMenuItem>
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                    <DropdownMenuItem>Đặt trước</DropdownMenuItem>
                  </>
                )}

                {room.status === "occupied" && (
                  <>
                    <DropdownMenuItem onClick={() => openCheckOutModal(room)}>
                      Trả phòng
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openAddServiceModal(room)}>
                      Thêm dịch vụ
                    </DropdownMenuItem>
                    <DropdownMenuItem>Chuyển phòng</DropdownMenuItem>
                    <DropdownMenuItem>Báo cáo sự cố</DropdownMenuItem>
                  </>
                )}

                {room.status === "cleaning" && (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(room.id, "vacant")}
                    >
                      Đã dọn dẹp
                    </DropdownMenuItem>
                    <DropdownMenuItem>Báo cáo sự cố</DropdownMenuItem>
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                  </>
                )}

                {room.status === "reserved" && (
                  <>
                    <DropdownMenuItem>Hủy đặt phòng</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openCheckInModal(room.id)}>
                      Nhận phòng
                    </DropdownMenuItem>
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                    <DropdownMenuItem>Báo cáo sự cố</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>

      <CheckInModal
        roomId={selectedRoomId}
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
        onCheckIn={handleCheckIn}
      />

      {selectedRoom && (
        <>
          <AddServiceModal
            isOpen={isAddServiceOpen}
            onClose={() => setIsAddServiceOpen(false)}
            customerName={selectedRoom.guestName || ""}
            customerId={selectedRoom.idNumber || ""}
            roomNumber={selectedRoom.id}
            onAddServices={handleAddServices}
          />

          <CheckOutModal
            isOpen={isCheckOutOpen}
            onClose={() => setIsCheckOutOpen(false)}
            customerName={selectedRoom.guestName || ""}
            customerId={selectedRoom.idNumber || ""}
            roomNumber={selectedRoom.id}
            roomCharge={410000} // This would normally come from your room price configuration
            services={selectedRoom.services || []}
            onCheckOut={handleCheckOut}
          />
        </>
      )}
    </>
  );
}
