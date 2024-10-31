import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Course, Chapter, UserProgress } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'
import CourseSidebarItem from './CourseSidebarItem'
import CourseProgress from '@/components/CourseProgress'

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & { userProgress: UserProgress[] | null })[]
  }
  progressCount: number
}

export default async function CourseSidebar({
  course,
  progressCount,
}: CourseSidebarProps) {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        courseId: course.id,
        userId,
      },
    },
  })

  return (
    <div
      className="h-full border-r flex flex-col overflow-y-auto"
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: 'rgba(17, 25, 40, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.125)',
      }}
    >
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold text-white">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  )
}
