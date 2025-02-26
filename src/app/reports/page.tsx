"use client";

import { useState } from "react";
import { FileDown, Filter, Search, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const revenueData = [
  { name: "Th. Hai", revenue: 4.5 },
  { name: "Th. Ba", revenue: 3.8 },
  { name: "Th. Tư", revenue: 3.2 },
  { name: "Th. Năm", revenue: 2.8 },
  { name: "Th. Sáu", revenue: 3.0 },
  { name: "Th. Bảy", revenue: 2.9 },
  { name: "CN", revenue: 2.0 },
];

const pieData = [
  { name: "Dịch vụ", value: 25 },
  { name: "Tiền phòng", value: 75 },
];

const COLORS = ["#93C5FD", "#60A5FA"];

const serviceData = [
  {
    day: "CN",
    laundry: 1.2,
    beverage: 0.8,
  },
  {
    day: "Th. Bảy",
    laundry: 2.0,
    beverage: 1.5,
  },
  {
    day: "Th. Sáu",
    laundry: 1.8,
    beverage: 1.2,
  },
  {
    day: "Th. Năm",
    laundry: 2.5,
    beverage: 2.0,
  },
  {
    day: "Th. Tư",
    laundry: 3.0,
    beverage: 2.2,
  },
  {
    day: "Th. Ba",
    laundry: 1.5,
    beverage: 1.0,
  },
  {
    day: "Th. Hai",
    laundry: 1.2,
    beverage: 0.8,
  },
].reverse();

const shifts = [
  {
    id: 1,
    name: "Trần Bảo Ngọc",
    position: "Nhân viên",
    checkIn: "7h - 9/1/2024",
    checkOut: "18h - 9/1/2024",
  },
  {
    id: 2,
    name: "Trần Bảo Ngọc",
    position: "Nhân viên",
    checkIn: "7h - 9/1/2024",
    checkOut: "18h - 9/1/2024",
  },
  {
    id: 3,
    name: "Trần Bảo Ngọc",
    position: "Nhân viên",
    checkIn: "7h - 9/1/2024",
    checkOut: "18h - 9/1/2024",
  },
];

export default function ReportsPage() {
  const [timeFilter, setTimeFilter] = useState("week");
  const [shiftFilter, setShiftFilter] = useState("day");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Báo cáo, thống kê</h1>
        <div className="flex items-center gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Theo tuần" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Theo ngày</SelectItem>
              <SelectItem value="week">Theo tuần</SelectItem>
              <SelectItem value="month">Theo tháng</SelectItem>
              <SelectItem value="year">Theo năm</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Total Revenue Card */}
        <div className="p-6 border rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">Tổng doanh thu</h2>
              <p className="text-sm text-muted-foreground">Trong tuần</p>
            </div>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">21,450,000</div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#60A5FA"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Distribution Card */}
        <div className="p-6 border rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">% Doanh thu</h2>
              <p className="text-sm text-muted-foreground">Trong tuần</p>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Service Revenue Card */}
      <div className="border rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-lg font-medium">Doanh thu Dịch vụ</h2>
          <p className="text-sm text-muted-foreground">Trong tuần</p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={serviceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="day" type="category" width={80} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="laundry"
                name="Doanh thu giặt là (Triệu VNĐ)"
                fill="#93C5FD"
                barSize={20}
              />
              <Bar
                dataKey="beverage"
                name="Doanh thu nước ngọt (Triệu VNĐ)"
                fill="#60A5FA"
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Shift History Card */}
      <div className="border rounded-lg">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Lịch sử giao ca</h2>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="secondary"
              className="bg-zinc-900 text-white hover:bg-zinc-800"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Xuất file Excel
            </Button>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-muted/50 rounded-md pl-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={shiftFilter} onValueChange={setShiftFilter}>
                  <SelectTrigger className="w-[140px] border-0 bg-transparent">
                    <SelectValue placeholder="Theo ngày" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Theo ngày</SelectItem>
                    <SelectItem value="week">Theo tuần</SelectItem>
                    <SelectItem value="month">Theo tháng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-[250px] bg-muted/50"
                />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Thời gian vào ca</TableHead>
                <TableHead>Thời gian tan ca</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>{shift.name}</TableCell>
                  <TableCell>{shift.position}</TableCell>
                  <TableCell>{shift.checkIn}</TableCell>
                  <TableCell>{shift.checkOut}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
