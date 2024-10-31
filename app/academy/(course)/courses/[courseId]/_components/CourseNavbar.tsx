import NavbarRoutes from '@/components/NavbarRoutes'
import { Chapter, Course, UserProgress } from '@prisma/client'
import React from 'react'
import CourseMobileSidebar from './CourseMobileSidebar'

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]
  }
  progressCount: number
}

export default function CourseNavbar({
  course,
  progressCount,
}: CourseNavbarProps) {
  return (
    <div
      className="p-4 border-b h-full flex items-center shadow-sm"
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: 'rgba(17, 25, 40, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.125)',
      }}
    >
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  )
}
