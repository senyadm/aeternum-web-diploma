import React from 'react'
import { Progress } from './ui/progress'
import { cn } from '@/lib/utils'

interface CourseProgressProps {
  value: number
  variant?: 'default' | 'success'
  size?: 'default' | 'sm'
}

const colorByVariant = {
  default: 'text-slate-400',
  success: 'text-white',
}
const sizeByVariant = {
  default: 'text-sm',
  sm: 'text-xs',
}

export default function CourseProgress({
  variant,
  value,
  size,
}: CourseProgressProps) {
  return (
    <div>
      <Progress variant={variant} className="h-2" value={value} />
      <p
        className={cn(
          'font-medium mt-2 textk-sky-700',
          colorByVariant[variant || 'default'],
          sizeByVariant[size || 'default'],
        )}
      >
        {Math.floor(value)}% Complete
      </p>
    </div>
  )
}
