"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Room {
  id: string;
  floor: number;
}

export default function RoomSettingsPage() {
  const [floors, setFloors] = useState([0, 1, 2]); // Ground floor, 1st floor, 2nd floor
  const [rooms, setRooms] = useState<Room[]>([
    // Ground floor
    { id: "001", floor: 0 },
    { id: "002", floor: 0 },
    { id: "003", floor: 0 },
    { id: "004", floor: 0 },
    // 1st floor
    { id: "101", floor: 1 },
    { id: "102", floor: 1 },
    { id: "103", floor: 1 },
    { id: "104", floor: 1 },
    { id: "105", floor: 1 },
    // 2nd floor
    { id: "201", floor: 2 },
    { id: "202", floor: 2 },
    { id: "203", floor: 2 },
    { id: "204", floor: 2 },
  ]);

  const addRoom = (floor: number) => {
    const floorRooms = rooms.filter((r) => r.floor === floor);
    const lastRoom = floorRooms[floorRooms.length - 1];
    const newRoomNumber = lastRoom
      ? String(Number(lastRoom.id) + 1).padStart(3, "0")
      : `${floor}01`;

    setRooms([...rooms, { id: newRoomNumber, floor }]);
  };

  const addFloor = () => {
    const newFloor = Math.max(...floors) + 1;
    setFloors([...floors, newFloor]);
  };

  const deleteFloor = (floor: number) => {
    setFloors(floors.filter((f) => f !== floor));
    setRooms(rooms.filter((r) => r.floor !== floor));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Cài đặt phòng/tầng</h1>

      {floors.map((floor) => (
        <div key={floor} className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium">
              {floor === 0 ? "Tầng Trệt" : `Tầng ${floor}`}
            </h2>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteFloor(floor)}
              className="h-7 px-2"
            >
              <X className="h-4 w-4 mr-1" />
              Xoá tầng
            </Button>
          </div>

          <div className="grid grid-cols-6 gap-4">
            {rooms
              .filter((room) => room.floor === floor)
              .map((room) => (
                <div key={room.id} className="border rounded-lg p-4 space-y-4">
                  <div className="text-2xl font-bold">{room.id}</div>
                  <Button variant="outline" className="w-full text-xs">
                    Cập nhật
                  </Button>
                </div>
              ))}
            <button
              onClick={() => addRoom(floor)}
              className="border rounded-lg p-4 flex items-center justify-center hover:bg-muted/50"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}

      <Button onClick={addFloor} className="mt-8">
        <Plus className="h-4 w-4 mr-2" />
        Thêm tầng
      </Button>
    </div>
  );
}
