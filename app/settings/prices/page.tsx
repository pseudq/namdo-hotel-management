"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useHotel } from "@/contexts/hotel-context"
import { AddRoomTypeModal } from "./add-room-type-modal"
import { DeleteRoomTypeModal } from "./delete-room-type-modal"

export default function RoomPriceSettingsPage() {
  const { roomTypes, updateRoomType } = useHotel()
  const [selectedType, setSelectedType] = useState(roomTypes[0])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleUpdate = () => {
    if (selectedType) {
      updateRoomType(selectedType)
    }
  }

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-xl md:text-2xl font-semibold">Cài đặt giá phòng</h1>
        <Button onClick={() => setIsAddModalOpen(true)} size="sm" className="h-8 md:h-9">
          <Plus className="h-4 w-4 mr-2" />
          Thêm loại phòng
        </Button>
      </div>

      <div className="space-y-4 p-4 md:p-6 border rounded-lg bg-card">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1">
            <Select
              value={selectedType?.id}
              onValueChange={(value) => setSelectedType(roomTypes.find((type) => type.id === value) || roomTypes[0])}
            >
              <SelectTrigger>
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
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleUpdate} className="flex-1 sm:flex-none">
              Chỉnh sửa
            </Button>
            <Button variant="destructive" onClick={handleOpenDeleteModal} className="flex-1 sm:flex-none">
              Xoá
            </Button>
          </div>
        </div>

        {selectedType && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <label className="text-sm font-medium">Giá phòng theo ngày (VND)</label>
              <Input
                type="number"
                value={selectedType.dailyRate}
                onChange={(e) =>
                  setSelectedType({
                    ...selectedType,
                    dailyRate: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Giá phòng qua đêm (VND)</label>
              <Input
                type="number"
                value={selectedType.overnightRate}
                onChange={(e) =>
                  setSelectedType({
                    ...selectedType,
                    overnightRate: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Giá giờ đầu (VND)</label>
              <Input
                type="number"
                value={selectedType.firstHourRate}
                onChange={(e) =>
                  setSelectedType({
                    ...selectedType,
                    firstHourRate: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Giá phòng theo giờ (VND)</label>
              <Input
                type="number"
                value={selectedType.hourlyRate}
                onChange={(e) =>
                  setSelectedType({
                    ...selectedType,
                    hourlyRate: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ghi chú</label>
              <Textarea
                value={selectedType.notes}
                onChange={(e) => setSelectedType({ ...selectedType, notes: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      <AddRoomTypeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <DeleteRoomTypeModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        roomTypeId={selectedType?.id}
      />
    </div>
  )
}

