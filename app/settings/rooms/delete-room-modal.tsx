"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useHotel } from "@/contexts/hotel-context"
import { useToast } from "@/contexts/toast-context"

interface DeleteRoomModalProps {
  isOpen: boolean
  onClose: () => void
  roomId: string | null
}

export function DeleteRoomModal({ isOpen, onClose, roomId }: DeleteRoomModalProps) {
  const { rooms, deleteRoom } = useHotel()
  const { showToast } = useToast()

  const room = roomId ? rooms.find((r) => r.id === roomId) : null

  const handleDelete = () => {
    if (roomId) {
      deleteRoom(roomId)
      showToast("Xóa phòng thành công", "success")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-semibold">Xác nhận xóa phòng</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa phòng {room?.id}? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="w-full sm:w-auto">
              Xóa
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

