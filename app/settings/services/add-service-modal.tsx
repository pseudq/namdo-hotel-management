"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useHotel, type Service } from "@/contexts/hotel-context"
import { useToast } from "@/contexts/toast-context"

interface AddServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddServiceModal({ isOpen, onClose }: AddServiceModalProps) {
  const { addService } = useHotel()
  const { showToast } = useToast()

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [surcharge, setSurcharge] = useState(0)
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    // Validate
    if (!name.trim()) {
      setError("Vui lòng nhập tên dịch vụ")
      return
    }

    // Generate a unique ID
    const id = name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-4)

    const newService: Service = {
      id,
      name,
      price,
      surcharge,
      notes,
    }

    addService(newService)
    showToast("Thêm dịch vụ thành công", "success")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm dịch vụ mới</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên dịch vụ</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Giá dịch vụ (VND)</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="surcharge">Phụ thu dịch vụ (VND)</Label>
            <Input
              id="surcharge"
              type="number"
              value={surcharge}
              onChange={(e) => setSurcharge(Number(e.target.value))}
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

