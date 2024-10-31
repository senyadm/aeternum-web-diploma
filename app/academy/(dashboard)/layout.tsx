import React from 'react'
import Sidebar from './_components/Sidebar'
import Navbar from './_components/Navbar'
import { Spotlight } from '@/components/ui/Spotlight'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen overflow-x-hidden">
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-to-20 h-screen"
        fill="white"
      />
      <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
      <Spotlight className="top-28 left-80 h-[80vw] w-[50vw]" fill="blue" />
      <Spotlight className="top-50 left-[50%] h-[80vw] w-[50vw]" fill="purple" />
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  )
}
