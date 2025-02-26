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

interface RoomType {
  id: string;
  name: string;
  dailyRate: number;
  overnightRate: number;
  firstHourRate: number;
  hourlyRate: number;
  notes: string;
}

export default function RoomPriceSettingsPage() {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([
    {
      id: "single",
      name: "Phòng đơn",
      dailyRate: 350000,
      overnightRate: 200000,
      firstHourRate: 60000,
      hourlyRate: 30000,
      notes: "",
    },
  ]);

  const [selectedType, setSelectedType] = useState(roomTypes[0]);

  const handleUpdate = () => {
    setRoomTypes(
      roomTypes.map((type) =>
        type.id === selectedType.id ? selectedType : type
      )
    );
  };

  const handleDelete = () => {
    setRoomTypes(roomTypes.filter((type) => type.id !== selectedType.id));
    if (roomTypes.length > 0) {
      setSelectedType(roomTypes[0]);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Cài đặt giá phòng</h1>

      <div className="space-y-4 p-6 border rounded-lg bg-card">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Select
              value={selectedType.id}
              onValueChange={(value) =>
                setSelectedType(
                  roomTypes.find((type) => type.id === value) || roomTypes[0]
                )
              }
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
          <Button variant="outline" onClick={handleUpdate}>
            Chỉnh sửa
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Xoá
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Giá phòng theo ngày (VND)
            </label>
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
            <label className="text-sm font-medium">
              Giá phòng qua đêm (VND)
            </label>
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
            <label className="text-sm font-medium">
              Giá phòng theo giờ (VND)
            </label>
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
              onChange={(e) =>
                setSelectedType({ ...selectedType, notes: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <Button
        onClick={() => {
          const newType = {
            id: `type-${roomTypes.length + 1}`,
            name: `Loại phòng ${roomTypes.length + 1}`,
            dailyRate: 0,
            overnightRate: 0,
            firstHourRate: 0,
            hourlyRate: 0,
            notes: "",
          };
          setRoomTypes([...roomTypes, newType]);
          setSelectedType(newType);
        }}
      >
        <Plus className="h-4 w-4 mr-2" />
        Thêm loại phòng
      </Button>
    </div>
  );
}
