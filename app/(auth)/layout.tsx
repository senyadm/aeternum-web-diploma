import { Spotlight } from '@/components/ui/Spotlight'
import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-to-20 h-screen"
        fill="white"
      />
      <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
      <Spotlight className="top-28 left-80 h-[80vw] w-[50vw]" fill="blue" />
      {children}
    </div>
  )
}
