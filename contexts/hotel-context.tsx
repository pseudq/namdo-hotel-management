"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define types
export type RoomStatus = "vacant" | "occupied" | "cleaning" | "reserved"

export interface RoomService {
  id: string
  name: string
  quantity: number
  price: number
}

export interface Room {
  id: string
  floor: number
  status: RoomStatus
  type: string
  time?: string
  guestName?: string
  idNumber?: string
  services?: RoomService[] // Add services array to Room type
}

export interface RoomType {
  id: string
  name: string
  dailyRate: number
  overnightRate: number
  firstHourRate: number
  hourlyRate: number
  notes: string
}

export interface Service {
  id: string
  name: string
  price: number
  surcharge: number
  notes: string
}

interface HotelContextType {
  // Rooms
  rooms: Room[]
  addRoom: (room: Room) => void
  updateRoom: (room: Room) => void
  deleteRoom: (roomId: string) => void
  getRoomsByFloor: (floor: number) => Room[]

  // Floors
  floors: number[]
  addFloor: () => void
  deleteFloor: (floor: number) => void

  // Room Types
  roomTypes: RoomType[]
  addRoomType: (roomType: RoomType) => void
  updateRoomType: (roomType: RoomType) => void
  deleteRoomType: (roomTypeId: string) => void

  // Services
  services: Service[]
  addService: (service: Service) => void
  updateService: (service: Service) => void
  deleteService: (serviceId: string) => void

  // Add new function to add services to a room
  addServicesToRoom: (roomId: string, services: RoomService[]) => void
  getRoomServices: (roomId: string) => RoomService[]
}

const HotelContext = createContext<HotelContextType | undefined>(undefined)

// Initial data
const initialRooms: Room[] = [
  // Ground floor
  { id: "001", floor: 0, status: "vacant", type: "single" },
  { id: "002", floor: 0, status: "occupied", type: "single" },
  { id: "003", floor: 0, status: "cleaning", type: "single" },
  { id: "004", floor: 0, status: "reserved", type: "single" },
  // 1st floor
  { id: "101", floor: 1, status: "vacant", type: "single" },
  { id: "102", floor: 1, status: "occupied", type: "single" },
  { id: "103", floor: 1, status: "vacant", type: "single" },
  { id: "104", floor: 1, status: "vacant", type: "single" },
  { id: "105", floor: 1, status: "vacant", type: "single" },
  // 2nd floor
  { id: "201", floor: 2, status: "vacant", type: "single" },
  { id: "202", floor: 2, status: "vacant", type: "single" },
  { id: "203", floor: 2, status: "vacant", type: "single" },
  { id: "204", floor: 2, status: "vacant", type: "single" },
]

const initialRoomTypes: RoomType[] = [
  {
    id: "single",
    name: "Phòng đơn",
    dailyRate: 350000,
    overnightRate: 200000,
    firstHourRate: 60000,
    hourlyRate: 30000,
    notes: "",
  },
  {
    id: "double",
    name: "Phòng đôi",
    dailyRate: 500000,
    overnightRate: 300000,
    firstHourRate: 80000,
    hourlyRate: 40000,
    notes: "",
  },
]

const initialServices: Service[] = [
  {
    id: "laundry",
    name: "Giặt là quần áo",
    price: 70000,
    surcharge: 20000,
    notes: "70.000đ / 1 ký quần áo",
  },
  {
    id: "beverage",
    name: "Nước uống",
    price: 20000,
    surcharge: 0,
    notes: "",
  },
]

export function HotelProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms)
  const [floors, setFloors] = useState<number[]>([0, 1, 2])
  const [roomTypes, setRoomTypes] = useState<RoomType[]>(initialRoomTypes)
  const [services, setServices] = useState<Service[]>(initialServices)

  // Room functions
  const addRoom = (room: Room) => {
    setRooms((prev) => [...prev, room])
  }

  const updateRoom = (updatedRoom: Room) => {
    setRooms((prev) => prev.map((room) => (room.id === updatedRoom.id ? updatedRoom : room)))
  }

  const deleteRoom = (roomId: string) => {
    setRooms((prev) => prev.filter((room) => room.id !== roomId))
  }

  const getRoomsByFloor = (floor: number) => {
    return rooms.filter((room) => room.floor === floor)
  }

  // Floor functions
  const addFloor = () => {
    const newFloor = Math.max(...floors) + 1
    setFloors((prev) => [...prev, newFloor])
  }

  const deleteFloor = (floor: number) => {
    setFloors((prev) => prev.filter((f) => f !== floor))
    setRooms((prev) => prev.filter((room) => room.floor !== floor))
  }

  // Room Type functions
  const addRoomType = (roomType: RoomType) => {
    setRoomTypes((prev) => [...prev, roomType])
  }

  const updateRoomType = (updatedRoomType: RoomType) => {
    setRoomTypes((prev) => prev.map((roomType) => (roomType.id === updatedRoomType.id ? updatedRoomType : roomType)))
  }

  const deleteRoomType = (roomTypeId: string) => {
    setRoomTypes((prev) => prev.filter((roomType) => roomType.id !== roomTypeId))
  }

  // Service functions
  const addService = (service: Service) => {
    setServices((prev) => [...prev, service])
  }

  const updateService = (updatedService: Service) => {
    setServices((prev) => prev.map((service) => (service.id === updatedService.id ? updatedService : service)))
  }

  const deleteService = (serviceId: string) => {
    setServices((prev) => prev.filter((service) => service.id !== serviceId))
  }

  // Add new function to add services to a room
  const addServicesToRoom = (roomId: string, newServices: RoomService[]) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId) {
          const existingServices = room.services || []
          return {
            ...room,
            services: [...existingServices, ...newServices],
          }
        }
        return room
      }),
    )
  }

  const getRoomServices = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)
    return room?.services || []
  }

  return (
    <HotelContext.Provider
      value={{
        rooms,
        addRoom,
        updateRoom,
        deleteRoom,
        getRoomsByFloor,
        floors,
        addFloor,
        deleteFloor,
        roomTypes,
        addRoomType,
        updateRoomType,
        deleteRoomType,
        services,
        addService,
        updateService,
        deleteService,
        addServicesToRoom,
        getRoomServices,
      }}
    >
      {children}
    </HotelContext.Provider>
  )
}

export function useHotel() {
  const context = useContext(HotelContext)
  if (context === undefined) {
    throw new Error("useHotel must be used within a HotelProvider")
  }
  return context
}

