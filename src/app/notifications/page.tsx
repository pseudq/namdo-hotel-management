"use client";

import { useState } from "react";
import { Star, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Notification {
  id: number;
  source: string;
  message: string;
  timestamp: string;
  timeDisplay: string;
  isStarred: boolean;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    source: "Hệ thống",
    message: "Phòng 103 chưa dọn quá 1 giờ",
    timestamp: "8:38 AM",
    timeDisplay: "8:38 AM",
    isStarred: false,
    isRead: false,
  },
  {
    id: 2,
    source: "Hệ thống",
    message: "Dữ liệu khách hàng không phù hợp #Mã lỗi: 0#1234",
    timestamp: "8:13 AM",
    timeDisplay: "8:13 AM",
    isStarred: true,
    isRead: false,
  },
  {
    id: 3,
    source: "Hệ thống",
    message: "Phòng 103 chưa dọn quá 1 giờ",
    timestamp: "Hôm qua",
    timeDisplay: "Hôm qua",
    isStarred: false,
    isRead: false,
  },
  {
    id: 4,
    source: "Hệ thống",
    message: "Phòng 103 chưa dọn quá 1 giờ",
    timestamp: "Tuần trước",
    timeDisplay: "Tuần trước",
    isStarred: false,
    isRead: false,
  },
  {
    id: 5,
    source: "Hệ thống",
    message: "Phòng 103 chưa dọn quá 1 giờ",
    timestamp: "Tháng trước",
    timeDisplay: "Tháng trước",
    isStarred: false,
    isRead: false,
  },
];

export default function NotificationsPage() {
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );
  const [notificationList, setNotificationList] = useState(notifications);

  const handleSelectNotification = (notificationId: number) => {
    setSelectedNotifications((prev) => {
      if (prev.includes(notificationId)) {
        return prev.filter((id) => id !== notificationId);
      } else {
        return [...prev, notificationId];
      }
    });
  };

  const handleToggleStar = (notificationId: number) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isStarred: !notification.isStarred }
          : notification
      )
    );
  };

  const handleMarkAsRead = () => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        selectedNotifications.includes(notification.id)
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setSelectedNotifications([]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Thông báo</h1>
        <Button
          variant="secondary"
          className="bg-zinc-900 text-white hover:bg-zinc-800"
          onClick={handleMarkAsRead}
          disabled={selectedNotifications.length === 0}
        >
          <CheckSquare className="h-4 w-4 mr-2" />
          Đánh dấu đã đọc
        </Button>
      </div>

      <div className="space-y-1">
        {notificationList.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-4 p-4 hover:bg-muted/50 rounded-lg ${
              notification.isRead ? "opacity-60" : ""
            }`}
          >
            <Checkbox
              checked={selectedNotifications.includes(notification.id)}
              onCheckedChange={() => handleSelectNotification(notification.id)}
            />
            <button
              onClick={() => handleToggleStar(notification.id)}
              className={`p-1 rounded-md hover:bg-muted ${
                notification.isStarred
                  ? "text-yellow-500"
                  : "text-muted-foreground"
              }`}
            >
              <Star
                className="h-4 w-4"
                fill={notification.isStarred ? "currentColor" : "none"}
              />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {notification.source}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {notification.message}
              </p>
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {notification.timeDisplay}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
