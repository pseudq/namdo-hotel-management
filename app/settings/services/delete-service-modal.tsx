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

interface DeleteServiceModalProps {
  isOpen: boolean
  onClose: () => void
  serviceId: string | undefined
}

export function DeleteServiceModal({ isOpen, onClose, serviceId }: DeleteServiceModalProps) {
  const { services, deleteService } = useHotel()
  const { showToast } = useToast()

  const service = serviceId ? services.find((s) => s.id === serviceId) : null

  const handleDelete = () => {
    if (serviceId) {
      deleteService(serviceId)
      showToast("Xóa dịch vụ thành công", "success")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa dịch vụ</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa dịch vụ "{service?.name}"? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

