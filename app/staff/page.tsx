"use client"

import { useState } from "react"
import { UserPlus, ChevronDown, Pencil, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { AddStaffModal } from "./add-staff-modal"

const staffList = [
  {
    id: 1,
    name: "Nhan vien A",
    status: "",
    createdAt: "06-03-2021",
    lastLogin: "06-03-2021",
  },
  {
    id: 2,
    name: "Nhan vien B",
    status: "",
    createdAt: "06-03-2021",
    lastLogin: "06-03-2021",
  },
  {
    id: 3,
    name: "Nhan vien C",
    status: "Đang trong ca",
    createdAt: "06-03-2021",
    lastLogin: "06-03-2021",
  },
  {
    id: 4,
    name: "Nhan vien D",
    status: "",
    createdAt: "06-03-2021",
    lastLogin: "06-03-2021",
  },
]

const managementList = [
  {
    id: 1,
    name: "Quản lý trưởng",
    createdAt: "06-03-2021",
    lastLogin: "06-03-2021",
  },
  {
    id: 2,
    name: "Admin",
    createdAt: "06-03-2021",
    lastLogin: "06-03-2021",
  },
]

export default function StaffPage() {
  const [isStaffExpanded, setIsStaffExpanded] = useState(true)
  const [isManagementExpanded, setIsManagementExpanded] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý nhân viên</h1>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-zinc-900 text-white hover:bg-zinc-800">
          <UserPlus className="h-4 w-4 mr-2" />
          Thêm nhân viên
        </Button>
      </div>

      <div className="space-y-4">
        <Collapsible open={isStaffExpanded} onOpenChange={setIsStaffExpanded} className="border rounded-lg">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50">
            <h2 className="text-lg font-medium">Danh sách nhân viên</h2>
            <ChevronDown className={`h-4 w-4 transition-transform ${isStaffExpanded ? "transform rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Đăng nhập lần cuối</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffList.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell>
                      {staff.status && (
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                          {staff.status}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{staff.createdAt}</TableCell>
                    <TableCell>{staff.lastLogin}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isManagementExpanded} onOpenChange={setIsManagementExpanded} className="border rounded-lg">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50">
            <h2 className="text-lg font-medium">Quản lý</h2>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isManagementExpanded ? "transform rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Đăng nhập lần cuối</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {managementList.map((manager) => (
                  <TableRow key={manager.id}>
                    <TableCell className="font-medium">{manager.name}</TableCell>
                    <TableCell>{manager.createdAt}</TableCell>
                    <TableCell>{manager.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <AddStaffModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}

