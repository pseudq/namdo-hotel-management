"use client"

import type React from "react"

import { createContext, useCallback, useContext, useState } from "react"
import { CheckCircle2, AlertTriangle, Info, AlertCircle, X } from "lucide-react"

type ToastType = "success" | "warning" | "info" | "error"

interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void
  removeToast: (id: string) => void
  toasts: Toast[]
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration = 5000) => {
      const id = Math.random().toString(36).substring(2, 9)
      const toast = { id, message, type, duration }
      setToasts((prevToasts) => [...prevToasts, toast])

      if (duration !== Number.POSITIVE_INFINITY) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }
    },
    [removeToast],
  )

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-2 md:flex-row">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  )
}

const Toast = ({
  toast,
  removeToast,
}: {
  toast: Toast
  removeToast: (id: string) => void
}) => {
  const iconMap: { [key in ToastType]: React.ReactElement } = {
    success: <CheckCircle2 className="text-green-500" />,
    warning: <AlertTriangle className="text-yellow-500" />,
    info: <Info className="text-blue-500" />,
    error: <AlertCircle className="text-red-500" />,
  }

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border border-gray-200 w-full md:w-auto"
      style={{
        animation: "slideIn 0.3s ease-in-out forwards",
      }}
    >
      {iconMap[toast.type]}
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 font-medium truncate">{toast.message}</p>
      </div>
      <button onClick={() => removeToast(toast.id)} className="ml-auto text-gray-500 hover:text-gray-700 flex-shrink-0">
        <X size={16} />
      </button>
    </div>
  )
}

