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

interface DeleteRoomTypeModalProps {
  isOpen: boolean
  onClose: () => void
  roomTypeId: string | undefined
}

export function DeleteRoomTypeModal({ isOpen, onClose, roomTypeId }: DeleteRoomTypeModalProps) {
  const { roomTypes, deleteRoomType, rooms } = useHotel()
  const { showToast } = useToast()

  const roomType = roomTypeId ? roomTypes.find((rt) => rt.id === roomTypeId) : null

  // Check if this room type is in use
  const isInUse = roomTypeId ? rooms.some((room) => room.type === roomTypeId) : false

  const handleDelete = () => {
    if (roomTypeId) {
      if (isInUse) {
        showToast("Không thể xóa loại phòng đang được sử dụng", "error")
        return
      }

      deleteRoomType(roomTypeId)
      showToast("Xóa loại phòng thành công", "success")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa loại phòng</DialogTitle>
          <DialogDescription>
            {isInUse
              ? `Không thể xóa loại phòng "${roomType?.name}" vì đang được sử dụng.`
              : `Bạn có chắc chắn muốn xóa loại phòng "${roomType?.name}"? Hành động này không thể hoàn tác.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isInUse}>
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

