"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CheckInModal, type CheckInData } from "@/components/check-in-modal"
import { AddServiceModal } from "@/components/add-service-modal"
import { CheckOutModal } from "@/components/check-out-modal"
import { useHotel, type Room, type RoomStatus } from "@/contexts/hotel-context"

const getStatusColor = (status: RoomStatus) => {
  switch (status) {
    case "vacant":
      return "bg-green-200 text-green-700 border-green-300"
    case "reserved":
      return "bg-yellow-200 text-yellow-700 border-yellow-300"
    case "cleaning":
      return "bg-yellow-200 text-yellow-700 border-yellow-300"
    case "occupied":
      return "bg-red-200 text-red-700 border-red-300"
    default:
      return "bg-gray-200 text-gray-700 border-gray-300"
  }
}

const getStatusText = (status: RoomStatus) => {
  switch (status) {
    case "vacant":
      return "Đang trống"
    case "reserved":
      return "Đã đặt trước"
    case "cleaning":
      return "Đang dọn dẹp"
    case "occupied":
      return "Đang ở"
    default:
      return status
  }
}

export default function RoomGrid({ floor = 0 }: { floor: number }) {
  const { getRoomsByFloor, updateRoom, roomTypes, addServicesToRoom, services: hotelServices } = useHotel()
  const roomsOnFloor = getRoomsByFloor(floor)
  const [gridCols, setGridCols] = useState(6)

  // Check-in modal state
  const [isCheckInOpen, setIsCheckInOpen] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState<string>("")

  // Add service modal state
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  // Check-out modal state
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false)

  // Updated responsive grid columns
  useEffect(() => {
    const updateGridCols = () => {
      const width = window.innerWidth
      if (width < 640) {
        setGridCols(2) // 2 columns on very small screens
      } else if (width < 768) {
        setGridCols(3) // 3 columns on small screens
      } else if (width < 1024) {
        setGridCols(4) // 4 columns on medium screens
      } else if (width < 1280) {
        setGridCols(5) // 5 columns on large screens
      } else {
        setGridCols(6) // 6 columns on extra large screens
      }
    }

    updateGridCols()
    window.addEventListener("resize", updateGridCols)
    return () => window.removeEventListener("resize", updateGridCols)
  }, [])

  // Open check-in modal
  const openCheckInModal = (roomId: string) => {
    setSelectedRoomId(roomId)
    setIsCheckInOpen(true)
  }

  // Open add service modal
  const openAddServiceModal = (room: Room) => {
    setSelectedRoom(room)
    setIsAddServiceOpen(true)
  }

  // Open check-out modal
  const openCheckOutModal = (room: Room) => {
    setSelectedRoom(room)
    setIsCheckOutOpen(true)
  }

  // Handle check-in process
  const handleCheckIn = (data: CheckInData) => {
    const room = roomsOnFloor.find((r) => r.id === data.roomId)
    if (room) {
      updateRoom({
        ...room,
        status: "occupied",
        time: "0 giờ",
        guestName: data.guestName,
        idNumber: data.idNumber,
      })
    }
    setIsCheckInOpen(false)
  }

  // Handle adding services
  const handleAddServices = (services: Array<{ id: string; name: string; quantity: number }>) => {
    if (!selectedRoom) return

    // Convert the services to RoomService type with prices
    const roomServices = services.map((service) => {
      const hotelService = hotelServices.find((s) => s.id === service.id)
      return {
        ...service,
        price: hotelService?.price || 0,
      }
    })

    addServicesToRoom(selectedRoom.id, roomServices)
    setIsAddServiceOpen(false)
  }

  // Handle check-out process
  const handleCheckOut = () => {
    if (!selectedRoom) return
    updateRoom({
      ...selectedRoom,
      status: "cleaning",
      time: undefined,
      guestName: undefined,
      idNumber: undefined,
    })
    setIsCheckOutOpen(false)
  }

  const handleStatusChange = (roomId: string, newStatus: RoomStatus) => {
    const room = roomsOnFloor.find((r) => r.id === roomId)
    if (room) {
      updateRoom({
        ...room,
        status: newStatus,
      })
    }
  }

  // Get room price based on room type
  const getRoomPrice = (roomTypeId: string) => {
    const roomType = roomTypes.find((rt) => rt.id === roomTypeId)
    return roomType ? roomType.dailyRate : 350000 // Default price if type not found
  }

  return (
    <>
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4`}>
        {roomsOnFloor.map((room) => (
          <div
            key={room.id}
            className={`relative p-3 md:p-4 rounded-lg shadow-sm border ${getStatusColor(room.status)}`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs md:text-sm">{getStatusText(room.status)}</span>
              {room.time && <span className="text-xs md:text-sm">{room.time}</span>}
            </div>
            <div className="text-xl md:text-2xl lg:text-3xl font-bold mt-2 md:mt-4 mb-1 md:mb-2">{room.id}</div>
            {room.guestName && (
              <div className="text-xs mt-1 mb-2 md:mb-4">
                <p className="truncate">KH: {room.guestName}</p>
                <p className="truncate">CCCD: {room.idNumber}</p>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute bottom-1 right-1 md:bottom-2 md:right-2 h-6 w-6 p-0"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {room.status === "vacant" && (
                  <>
                    <DropdownMenuItem onClick={() => openCheckInModal(room.id)}>Nhận phòng</DropdownMenuItem>
                    <DropdownMenuItem>Báo cáo sự cố</DropdownMenuItem>
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                    <DropdownMenuItem>Đặt trước</DropdownMenuItem>
                  </>
                )}

                {room.status === "occupied" && (
                  <>
                    <DropdownMenuItem onClick={() => openCheckOutModal(room)}>Trả phòng</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openAddServiceModal(room)}>Thêm dịch vụ</DropdownMenuItem>
                    <DropdownMenuItem>Chuyển phòng</DropdownMenuItem>
                    <DropdownMenuItem>Báo cáo sự cố</DropdownMenuItem>
                  </>
                )}

                {room.status === "cleaning" && (
                  <>
                    <DropdownMenuItem onClick={() => handleStatusChange(room.id, "vacant")}>
                      Đã dọn dẹp
                    </DropdownMenuItem>
                    <DropdownMenuItem>Báo cáo sự cố</DropdownMenuItem>
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                  </>
                )}

                {room.status === "reserved" && (
                  <>
                    <DropdownMenuItem>Hủy đặt phòng</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openCheckInModal(room.id)}>Nhận phòng</DropdownMenuItem>
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
            roomCharge={getRoomPrice(selectedRoom.type)}
            services={selectedRoom.services || []} // Pass the room's services
            onCheckOut={handleCheckOut}
          />
        </>
      )}
    </>
  )
}

