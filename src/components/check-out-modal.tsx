"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Service {
  name: string;
  quantity: number;
  price: number;
}

interface CheckOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  customerId: string;
  roomNumber: string;
  roomCharge: number;
  services: Service[];
  onCheckOut: () => void;
}

export function CheckOutModal({
  isOpen,
  onClose,
  customerName,
  customerId,
  roomNumber,
  roomCharge,
  services,
  onCheckOut,
}: CheckOutModalProps) {
  const [discount, setDiscount] = useState(0);
  const [promotion, setPromotion] = useState("");

  const servicesTotal = services.reduce(
    (sum, service) => sum + service.price * service.quantity,
    0
  );

  const total = roomCharge + servicesTotal - discount;

  const handleCheckOut = () => {
    onCheckOut();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            TRẢ PHÒNG
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
            <h3 className="font-medium">Thông tin tiền phòng & dịch vụ</h3>
            <div className="flex justify-between p-2 bg-muted rounded-md">
              <div>Phòng đơn - Qua đêm - 3 giờ</div>
              <div>{roomCharge.toLocaleString()} VND</div>
            </div>

            {services.length > 0 ? (
              <div className="space-y-2">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-2 bg-muted rounded-md"
                  >
                    <div>
                      {service.name} - SL:{service.quantity}
                    </div>
                    <div>
                      {(service.price * service.quantity).toLocaleString()} VND
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2 bg-muted rounded-md">Không có dịch vụ</div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Khuyến mãi & giảm giá</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm">Nội dung khuyến mãi</label>
                <Textarea
                  value={promotion}
                  onChange={(e) => setPromotion(e.target.value)}
                  placeholder="Nhập nội dung khuyến mãi"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Nhập số tiền</label>
                <Input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Tổng hóa đơn</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Tiền phòng:</span>
                <span>{roomCharge.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between">
                <span>Tiền dịch vụ:</span>
                <span>{servicesTotal.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between">
                <span>Khuyến mãi:</span>
                <span>{discount.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Tổng:</span>
                <span>{total.toLocaleString()} VND</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>
            Thoát
          </Button>
          <Button
            variant="outline"
            className="bg-muted"
            onClick={() => {
              // Handle invoice generation
            }}
          >
            Xuất hóa đơn
          </Button>
          <Button
            onClick={handleCheckOut}
            className="bg-black text-white hover:bg-black/90"
          >
            Trả phòng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
