"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useHotel } from "@/contexts/hotel-context";

interface Service {
  id: string;
  name: string;
  quantity: number;
}

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  customerId: string;
  roomNumber: string;
  onAddServices: (services: Service[]) => void;
}

export function AddServiceModal({
  isOpen,
  onClose,
  customerName,
  customerId,
  roomNumber,
  onAddServices,
}: AddServiceModalProps) {
  const { services: hotelServices } = useHotel();
  const [selectedService, setSelectedService] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("1");
  const [currentServices, setCurrentServices] = useState<Service[]>([]);

  const quantities = ["1", "2", "3", "4", "5"];

  const handleAddService = () => {
    if (selectedService) {
      const service = hotelServices.find((s) => s.id === selectedService);
      if (service) {
        const existingServiceIndex = currentServices.findIndex(
          (s) => s.id === selectedService
        );

        if (existingServiceIndex !== -1) {
          // Dịch vụ đã tồn tại, cập nhật số lượng
          const updatedServices = [...currentServices];
          updatedServices[existingServiceIndex] = {
            ...updatedServices[existingServiceIndex],
            quantity: Number.parseInt(selectedQuantity),
          };
          setCurrentServices(updatedServices);
        } else {
          // Dịch vụ chưa tồn tại, thêm mới
          setCurrentServices([
            ...currentServices,
            {
              id: service.id,
              name: service.name,
              quantity: Number.parseInt(selectedQuantity),
            },
          ]);
        }

        setSelectedService("");
        setSelectedQuantity("1");
      }
    }
  };

  const handleRemoveService = (index: number) => {
    setCurrentServices(currentServices.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    onAddServices(currentServices);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            THÊM DỊCH VỤ
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Thông tin khách hàng</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 p-2 bg-muted rounded-md">
                {customerName}
              </div>
              <div className="p-2 bg-muted rounded-md">{roomNumber}</div>
              <div className="col-span-2 p-2 bg-muted rounded-md">
                {customerId}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Thêm dịch vụ</h3>
            <div className="flex items-center gap-2">
              <Select
                value={selectedService}
                onValueChange={setSelectedService}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Loại dịch vụ" />
                </SelectTrigger>
                <SelectContent>
                  {hotelServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedQuantity}
                onValueChange={setSelectedQuantity}
              >
                <SelectTrigger className="w-24">
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

              <Button
                onClick={handleAddService}
                className="bg-black text-white hover:bg-black/90"
              >
                Thêm DV
              </Button>
            </div>
          </div>

          {currentServices.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Dịch vụ hiện tại</h3>
              <div className="space-y-2">
                {currentServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                  >
                    <span>
                      {service.name} - SL:{service.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveService(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button
            onClick={handleComplete}
            className="bg-black text-white hover:bg-black/90"
          >
            Hoàn tất
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
