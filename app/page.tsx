"use client";

import { LogOut, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RoomGrid from "./room-grid";
import GuestList from "./guest-list";
import ReceiptList from "./receipt-list";
import SearchHeader from "./search-header";
import { SearchProvider } from "./search-context";
import { useEffect, useState } from "react";
import { useHotel } from "@/contexts/hotel-context";
import { PageContainer } from "@/components/page-container";

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { floors, getRoomsByFloor } = useHotel();

  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  const calculateRoomStats = () => {
    const roomsOnFloor = getRoomsByFloor(currentFloor);
    const cleaning = roomsOnFloor.filter(
      (room) => room.status === "cleaning"
    ).length;
    const vacant = roomsOnFloor.filter(
      (room) => room.status === "vacant"
    ).length;
    const occupied = roomsOnFloor.filter(
      (room) => room.status === "occupied"
    ).length;

    return { cleaning, vacant, occupied };
  };

  const stats = isClient
    ? calculateRoomStats()
    : { cleaning: 0, vacant: 0, occupied: 0 };

  if (!isClient) {
    return null;
  }

  return (
    <SearchProvider>
      <PageContainer>
        <div className="flex flex-col min-h-screen">
          {/* Sticky Header */}
          <div className="sticky top-0 z-30 bg-background border-b">
            <div className="flex flex-col gap-4 p-4">
              {/* Top Row */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <Button variant="outline" className="gap-2 text-sm">
                  Quản lý
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  className="gap-2 bg-black text-white hover:bg-black/90 text-sm"
                  onClick={handleLogout}
                >
                  Logout
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>

              {/* Search Row */}
              <div className="w-full">
                <SearchHeader />
              </div>

              {/* Floor Controls & Stats */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                  <ChevronLeft
                    className="h-4 w-4 cursor-pointer hover:text-primary"
                    onClick={() => {
                      if (currentFloor > 0) setCurrentFloor(currentFloor - 1);
                    }}
                  />
                  <span className="text-sm w-[100px] text-center font-medium">
                    {currentFloor === 0 ? "Tầng trệt" : `Tầng ${currentFloor}`}
                  </span>
                  <ChevronRight
                    className="h-4 w-4 cursor-pointer hover:text-primary"
                    onClick={() => {
                      if (currentFloor < Math.max(...floors))
                        setCurrentFloor(currentFloor + 1);
                    }}
                  />
                </div>

                <div className="flex gap-4 text-sm flex-wrap">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">
                    {stats.cleaning} Đang dọn dẹp
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md">
                    {stats.vacant} Đang trống
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md">
                    {stats.occupied} Đang sử dụng
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 space-y-6">
            {/* Room Grid Section */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h2 className="text-lg font-medium mb-4">Sơ đồ phòng</h2>
              <RoomGrid floor={currentFloor} />
            </div>

            {/* Guest List Section */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h2 className="text-lg font-medium mb-4">
                Danh sách khách trong ngày
              </h2>
              <GuestList />
            </div>

            {/* Receipt List Section */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h2 className="text-lg font-medium mb-4">
                Danh sách hóa đơn trong ngày
              </h2>
              <ReceiptList />
            </div>
          </div>
        </div>
      </PageContainer>
    </SearchProvider>
  );
}
