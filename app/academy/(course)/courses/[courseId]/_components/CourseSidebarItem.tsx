'use client'

import { cn } from '@/lib/utils'
import { CheckCircleIcon, LockIcon, PlayCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface CourseSidebarItemProps {
  id: string
  label: string
  isCompleted: boolean
  courseId: string
  isLocked: boolean
}

export default function CourseSidebarItem({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) {
  const pathname = usePathname()
  const router = useRouter()
  const Icon = isLocked ? LockIcon : isCompleted ? CheckCircleIcon : PlayCircle
  const isActive = pathname?.includes(id)
  const onClick = () => {
    router.push(`/academy/courses/${courseId}/chapters/${id}`)
  }
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-center gap-x-2 text-slate-300 text-sm font-[500] pl-6 transition-all hover:text-slate-300 hover:bg-slate-300/20',
        isActive &&
          'text-white bg-slate-200/20 hover:bg-slate-200/20 hover:bg-slate-700',
        isCompleted && 'text-emerald-700 hover:text-emerald-700',
        isCompleted && isActive && 'bg-emerald-200/20',
      )}
    >
      <div className="flex items-left gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            'text-slate-300 hover:text-slate-300',
            isActive && 'text-white',
            isCompleted && 'text-emeald-700',
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto opacity-0 border-2 border-slate-500 h-full transition-all',
          isActive && 'opacity-100',
          isCompleted && 'border-emerald-700',
        )}
      />
    </button>
  )
}
