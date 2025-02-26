"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Service {
  id: string;
  name: string;
  price: number;
  surcharge: number;
  notes: string;
}

export default function ServicePriceSettingsPage() {
  const [services, setServices] = useState<Service[]>([
    {
      id: "laundry",
      name: "Giặt là quần áo",
      price: 70000,
      surcharge: 20000,
      notes: "70.000đ / 1 ký quần áo",
    },
  ]);

  const [selectedService, setSelectedService] = useState(services[0]);

  const handleUpdate = () => {
    setServices(
      services.map((service) =>
        service.id === selectedService.id ? selectedService : service
      )
    );
  };

  const handleDelete = () => {
    setServices(
      services.filter((service) => service.id !== selectedService.id)
    );
    if (services.length > 0) {
      setSelectedService(services[0]);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Cài đặt giá dịch vụ</h1>

      <div className="space-y-4 p-6 border rounded-lg bg-card">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Select
              value={selectedService.id}
              onValueChange={(value) =>
                setSelectedService(
                  services.find((service) => service.id === value) ||
                    services[0]
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={handleUpdate}>
            Chỉnh sửa
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Xoá
          </Button>
        </div>

        <div className="space-y-4">
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
      </div>

      <Button
        onClick={() => {
          const newService = {
            id: `service-${services.length + 1}`,
            name: `Dịch vụ ${services.length + 1}`,
            price: 0,
            surcharge: 0,
            notes: "",
          };
          setServices([...services, newService]);
          setSelectedService(newService);
        }}
      >
        <Plus className="h-4 w-4 mr-2" />
        Thêm dịch vụ
      </Button>
    </div>
  );
}
