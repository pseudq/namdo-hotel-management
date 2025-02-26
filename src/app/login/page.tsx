"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Info,
  Search,
  Home,
  Settings,
  FileText,
  BarChart2,
  Users,
  UserCircle,
  Bell,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="flex h-screen">
      {/* Left sidebar */}
      <div className="w-[68px] border-r bg-background flex flex-col items-center py-4">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-8">
          HM
        </div>
        <div className="flex flex-col items-center gap-6">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Home className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Users className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
        <div className="mt-auto">
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        <div className="w-1/2 p-10 flex items-center justify-center">
          <div className="max-w-[400px] w-full">
            <h1 className="text-3xl font-bold mb-2">Chào mừng</h1>
            <p className="text-muted-foreground mb-8">Xin vui lòng đăng nhập</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm" htmlFor="username">
                  Tên đăng nhập
                </label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ngoc12345"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm" htmlFor="password">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Đăng nhập
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>
            </form>

            <div className="mt-16 border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Cần trợ giúp? Liên hệ hỗ trợ qua Email
              </p>
              <div className="flex items-center mt-2 text-sm">
                <Info className="h-4 w-4 text-red-500 mr-2" />
                <span>hotro@hotelmgm.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-purple-600 p-10 flex items-center justify-center">
          <div className="max-w-[500px] w-full">
            <Image
              src="/main.png"
              width={1500}
              height={2000}
              alt="Hotel Management System Screenshots"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
