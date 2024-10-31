import React from 'react'
import Logo from './Logo'
import SidebarRoutes from './SidebarRoutes'

export default function Sidebar() {
  return (
    <div
      className="h-full border-r flex flex-col overflow-y-auto"
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: 'rgba(17, 25, 40, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.125)',
      }}
    >
      <div className="flex gap-2 p-6">
        <span className="font-bold text-lg text-white">AW Academy</span>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}
