"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useHotel, type Room } from "@/contexts/hotel-context"
import { useToast } from "@/contexts/toast-context"

interface AddEditRoomModalProps {
  isOpen: boolean
  onClose: () => void
  floor: number | null
  roomId: string | null
  mode: "add" | "edit"
}

export function AddEditRoomModal({ isOpen, onClose, floor, roomId, mode }: AddEditRoomModalProps) {
  const { rooms, roomTypes, addRoom, updateRoom } = useHotel()
  const { showToast } = useToast()

  const [roomNumber, setRoomNumber] = useState("")
  const [roomType, setRoomType] = useState(roomTypes[0]?.id || "")
  const [error, setError] = useState("")

  useEffect(() => {
    if (mode === "edit" && roomId) {
      const room = rooms.find((r) => r.id === roomId)
      if (room) {
        setRoomNumber(room.id)
        setRoomType(room.type)
      }
    } else {
      // For add mode, generate a suggested room number
      if (floor !== null) {
        const floorRooms = rooms.filter((r) => r.floor === floor)
        if (floorRooms.length > 0) {
          // Find the highest room number on this floor
          const highestNumber = Math.max(...floorRooms.map((r) => Number.parseInt(r.id.substring(floor === 0 ? 1 : 2))))
          const nextNumber = highestNumber + 1
          const prefix = floor === 0 ? "00" : `${floor}0`
          setRoomNumber(`${prefix}${nextNumber}`)
        } else {
          // First room on this floor
          const prefix = floor === 0 ? "00" : `${floor}0`
          setRoomNumber(`${prefix}1`)
        }
      }
      setRoomType(roomTypes[0]?.id || "")
    }
    setError("")
  }, [mode, roomId, floor, rooms, roomTypes])

  const handleSubmit = () => {
    // Validate
    if (!roomNumber.trim()) {
      setError("Vui lòng nhập số phòng")
      return
    }

    if (!roomType) {
      setError("Vui lòng chọn loại phòng")
      return
    }

    // Check if room number already exists (for add mode)
    if (mode === "add" && rooms.some((r) => r.id === roomNumber)) {
      setError("Số phòng đã tồn tại")
      return
    }

    if (mode === "add" && floor !== null) {
      const newRoom: Room = {
        id: roomNumber,
        floor: floor,
        status: "vacant",
        type: roomType,
      }
      addRoom(newRoom)
      showToast("Thêm phòng thành công", "success")
    } else if (mode === "edit" && roomId) {
      const room = rooms.find((r) => r.id === roomId)
      if (room) {
        const updatedRoom: Room = {
          ...room,
          id: roomNumber,
          type: roomType,
        }
        updateRoom(updatedRoom)
        showToast("Cập nhật phòng thành công", "success")
      }
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-semibold">
            {mode === "add" ? "Thêm phòng mới" : "Cập nhật phòng"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="roomNumber" className="text-right text-sm">
              Số phòng
            </Label>
            <Input
              id="roomNumber"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="col-span-3"
              disabled={mode === "edit"}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="roomType" className="text-right text-sm">
              Loại phòng
            </Label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn loại phòng" />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Hủy
            </Button>
            <Button onClick={handleSubmit} className="w-full sm:w-auto">
              {mode === "add" ? "Thêm" : "Cập nhật"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

