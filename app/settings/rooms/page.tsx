"use client"

import { useState } from "react"
import { Plus, X, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useHotel } from "@/contexts/hotel-context"
import { AddEditRoomModal } from "./add-edit-room-modal"
import { DeleteRoomModal } from "./delete-room-modal"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function RoomSettingsPage() {
  const { floors, rooms, addFloor, deleteFloor } = useHotel()

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentFloor, setCurrentFloor] = useState<number | null>(null)
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")

  const openAddRoomModal = (floor: number) => {
    setCurrentFloor(floor)
    setSelectedRoomId(null)
    setModalMode("add")
    setIsAddEditModalOpen(true)
  }

  const openEditRoomModal = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)
    if (room) {
      setCurrentFloor(room.floor)
      setSelectedRoomId(roomId)
      setModalMode("edit")
      setIsAddEditModalOpen(true)
    }
  }

  const openDeleteRoomModal = (roomId: string) => {
    setSelectedRoomId(roomId)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">Cài đặt phòng/tầng</h1>
        <Button onClick={addFloor} size="sm" className="h-8 md:h-9">
          <Plus className="h-4 w-4 mr-2" />
          Thêm tầng
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="space-y-6">
          {floors.map((floor) => (
            <div key={floor} className="space-y-4">
              <div className="flex items-center gap-2 md:gap-4">
                <h2 className="text-base md:text-lg font-medium">{floor === 0 ? "Tầng Trệt" : `Tầng ${floor}`}</h2>
                <Button variant="destructive" size="sm" onClick={() => deleteFloor(floor)} className="h-7 px-2 text-xs">
                  <X className="h-3 w-3 mr-1" />
                  Xoá tầng
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {rooms
                  .filter((room) => room.floor === floor)
                  .map((room) => (
                    <div key={room.id} className="border rounded-lg p-3 md:p-4 space-y-3 md:space-y-4">
                      <div className="text-xl md:text-2xl font-bold">{room.id}</div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 text-xs h-8"
                          onClick={() => openEditRoomModal(room.id)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Cập nhật
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openDeleteRoomModal(room.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                <button
                  onClick={() => openAddRoomModal(floor)}
                  className="border rounded-lg p-4 flex items-center justify-center hover:bg-muted/50 min-h-[120px]"
                >
                  <Plus className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <AddEditRoomModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        floor={currentFloor}
        roomId={selectedRoomId}
        mode={modalMode}
      />

      <DeleteRoomModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} roomId={selectedRoomId} />
    </div>
  )
}

