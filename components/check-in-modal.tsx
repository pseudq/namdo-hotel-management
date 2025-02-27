"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/contexts/toast-context"

type Service = {
  type: string
  quantity: number
}

interface CheckInModalProps {
  roomId: string
  isOpen: boolean
  onClose: () => void
  onCheckIn: (data: CheckInData) => void
}

export interface CheckInData {
  roomId: string
  guestName: string
  idNumber: string
  services: Service[]
  note: string
}

export function CheckInModal({ roomId, isOpen, onClose, onCheckIn }: CheckInModalProps) {
  const { showToast } = useToast()
  const [guestName, setGuestName] = useState("")
  const [idNumber, setIdNumber] = useState("")
  const [services, setServices] = useState<Service[]>([])
  const [currentServiceType, setCurrentServiceType] = useState("")
  const [currentServiceQuantity, setCurrentServiceQuantity] = useState("1")
  const [note, setNote] = useState("")
  const [errors, setErrors] = useState({
    guestName: false,
    idNumber: false,
  })

  const serviceTypes = ["Giặt ủi", "Đồ ăn", "Đồ uống", "Dịch vụ spa", "Dịch vụ xe"]
  const quantities = ["1", "2", "3", "4", "5"]

  const addService = () => {
    if (currentServiceType) {
      setServices([
        ...services,
        {
          type: currentServiceType,
          quantity: Number.parseInt(currentServiceQuantity),
        },
      ])
      setCurrentServiceType("")
      setCurrentServiceQuantity("1")
    }
  }

  const handleSubmit = () => {
    // Validate form
    const newErrors = {
      guestName: !guestName.trim(),
      idNumber: !idNumber.trim(),
    }

    setErrors(newErrors)

    if (newErrors.guestName || newErrors.idNumber) {
      showToast("Vui lòng điền đầy đủ thông tin", "error")
      return
    }

    onCheckIn({
      roomId,
      guestName,
      idNumber,
      services,
      note,
    })

    showToast("Nhận phòng thành công", "success")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center">NHẬN PHÒNG</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6 py-4">
          <div>
            <h3 className="text-base md:text-lg font-medium mb-3">Thông tin khách hàng</h3>
            <div className="space-y-4">
              <Input
                placeholder="Tên khách hàng"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className={errors.guestName ? "border-red-500" : ""}
              />
              {errors.guestName && <p className="text-red-500 text-sm">Vui lòng nhập tên khách hàng</p>}

              <Input
                placeholder="Số CMND/CCCD"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className={errors.idNumber ? "border-red-500" : ""}
              />
              {errors.idNumber && <p className="text-red-500 text-sm">Vui lòng nhập số CMND/CCCD</p>}
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-medium mb-3">Thêm dịch vụ (nếu có)</h3>
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
              <Select value={currentServiceType} onValueChange={setCurrentServiceType}>
                <SelectTrigger className="w-full sm:w-auto">
                  <SelectValue placeholder="Loại dịch vụ" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={currentServiceQuantity} onValueChange={setCurrentServiceQuantity}>
                <SelectTrigger className="w-full sm:w-24">
                  <SelectValue placeholder="SL" />
                </SelectTrigger>
                <SelectContent>
                  {quantities.map((qty) => (
                    <SelectItem key={qty} value={qty}>
                      {qty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={addService} className="bg-black text-white hover:bg-black/90 w-full sm:w-auto">
                Thêm DV
              </Button>
            </div>

            {services.length > 0 && (
              <div className="space-y-2 mt-4">
                {services.map((service, index) => (
                  <div key={index} className="flex justify-between px-3 py-2 bg-gray-100 rounded">
                    <span>{service.type}</span>
                    <span>SL: {service.quantity}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-base md:text-lg font-medium mb-3">Ghi chú</h3>
            <Textarea placeholder="Ghi chú" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Hủy
          </Button>
          <Button onClick={handleSubmit} className="bg-black text-white hover:bg-black/90 w-full sm:w-auto">
            Nhận phòng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

