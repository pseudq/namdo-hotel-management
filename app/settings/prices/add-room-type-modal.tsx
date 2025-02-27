"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useHotel, type RoomType } from "@/contexts/hotel-context"
import { useToast } from "@/contexts/toast-context"

interface AddRoomTypeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddRoomTypeModal({ isOpen, onClose }: AddRoomTypeModalProps) {
  const { roomTypes, addRoomType } = useHotel()
  const { showToast } = useToast()

  const [name, setName] = useState("")
  const [dailyRate, setDailyRate] = useState(0)
  const [overnightRate, setOvernightRate] = useState(0)
  const [firstHourRate, setFirstHourRate] = useState(0)
  const [hourlyRate, setHourlyRate] = useState(0)
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    // Validate
    if (!name.trim()) {
      setError("Vui lòng nhập tên loại phòng")
      return
    }

    // Generate a unique ID
    const id = name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-4)

    const newRoomType: RoomType = {
      id,
      name,
      dailyRate,
      overnightRate,
      firstHourRate,
      hourlyRate,
      notes,
    }

    addRoomType(newRoomType)
    showToast("Thêm loại phòng thành công", "success")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm loại phòng mới</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên loại phòng</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dailyRate">Giá phòng theo ngày (VND)</Label>
            <Input
              id="dailyRate"
              type="number"
              value={dailyRate}
              onChange={(e) => setDailyRate(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="overnightRate">Giá phòng qua đêm (VND)</Label>
            <Input
              id="overnightRate"
              type="number"
              value={overnightRate}
              onChange={(e) => setOvernightRate(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstHourRate">Giá giờ đầu (VND)</Label>
            <Input
              id="firstHourRate"
              type="number"
              value={firstHourRate}
              onChange={(e) => setFirstHourRate(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Giá phòng theo giờ (VND)</Label>
            <Input
              id="hourlyRate"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Thêm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

