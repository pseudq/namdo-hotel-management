"use client";

import { LogOut, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RoomGrid from "./room-grid";
import GuestList from "./guest-list";
import ReceiptList from "./receipt-list";
import Sidebar from "./sidebar";
import SearchHeader from "./search-header";
import { SearchProvider } from "./search-context";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  // Use client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    // In a real app, you would also clear auth tokens/cookies here
    router.push("/login");
  };

  if (!isClient) {
    return null; // Return nothing during SSR to avoid hydration mismatch
  }

  return (
    <SearchProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />

        <main className="flex-1 overflow-auto">
          <div className="border-b">
            <div className="flex h-16 items-center px-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                  <ChevronLeft
                    className="h-4 w-4 cursor-pointer hover:text-primary"
                    onClick={() => {
                      if (currentFloor > 0) setCurrentFloor(currentFloor - 1);
                    }}
                  />
                  <span className="text-sm font-medium">
                    {currentFloor === 0 ? "Tầng trệt" : `Tầng ${currentFloor}`}
                  </span>
                  <ChevronRight
                    className="h-4 w-4 cursor-pointer hover:text-primary"
                    onClick={() => {
                      if (currentFloor < 2) setCurrentFloor(currentFloor + 1);
                    }}
                  />
                </div>

                <div className="flex gap-4 text-sm">
                  <span>0 - Chưa đơn đẹp</span>
                  <span>0 - Đang trống</span>
                  <span>0 - Đang sử dụng</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <SearchHeader />
                <Button variant="outline" className="gap-2">
                  Quản lý trưởng
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  className="gap-2 bg-black text-white hover:bg-black/90"
                  onClick={handleLogout}
                >
                  Logout
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <RoomGrid floor={currentFloor} />

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">
                  Danh sách khách trong ngày
                </h2>
                <GuestList />
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">
                  Danh sách phiếu thu trong ngày
                </h2>
                <ReceiptList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SearchProvider>
  );
}
