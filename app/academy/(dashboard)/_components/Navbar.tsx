import React from 'react'
import MobileSidebar from './MobileSidebar'
import NavbarRoutes from '@/components/NavbarRoutes'

export default function Navbar() {
  return (
    <div
      className="p-4 border-b h-full flex items-center shadow-sm"
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: 'rgba(17, 25, 40, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.125)',
      }}
    >
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}
