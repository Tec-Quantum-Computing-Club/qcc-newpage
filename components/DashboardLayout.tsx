import type React from "react"
import { Sidebar } from "./Sidebar"
import { NotificationDropdown } from "./NotificationDropdown"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  console.log("Rendering DashboardLayout")
  return (
    <div className="flex-1 pt-16">
      <div className="fixed top-4 right-4 z-50">
        <NotificationDropdown />
      </div>
      <Sidebar />
      <div className="ml-64">
        <main className="p-8 min-h-[calc(100vh-10rem)] bg-background">{children}</main>
      </div>
    </div>
  )
}

