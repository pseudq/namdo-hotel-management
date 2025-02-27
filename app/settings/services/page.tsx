"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useHotel } from "@/contexts/hotel-context"
import { AddServiceModal } from "./add-service-modal"
import { DeleteServiceModal } from "./delete-service-modal"

export default function ServicePriceSettingsPage() {
  const { services, updateService } = useHotel()
  const [selectedService, setSelectedService] = useState(services[0])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleUpdate = () => {
    if (selectedService) {
      updateService(selectedService)
    }
  }

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-xl md:text-2xl font-semibold">Cài đặt giá dịch vụ</h1>
        <Button onClick={() => setIsAddModalOpen(true)} size="sm" className="h-8 md:h-9">
          <Plus className="h-4 w-4 mr-2" />
          Thêm dịch vụ
        </Button>
      </div>

      <div className="space-y-4 p-4 md:p-6 border rounded-lg bg-card">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1">
            <Select
              value={selectedService?.id}
              onValueChange={(value) =>
                setSelectedService(services.find((service) => service.id === value) || services[0])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    <span className="line-clamp-1">{service.name}</span>
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

        {selectedService && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <label className="text-sm font-medium">Giá dịch vụ (VND)</label>
              <Input
                type="number"
                value={selectedService.price}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phụ thu dịch vụ (VND)</label>
              <Input
                type="number"
                value={selectedService.surcharge}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    surcharge: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ghi chú</label>
              <Textarea
                value={selectedService.notes}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    notes: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}
      </div>

      <AddServiceModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <DeleteServiceModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        serviceId={selectedService?.id}
      />
    </div>
  )
}

