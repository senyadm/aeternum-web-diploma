import IconBadge from '@/components/IconBadge'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface InfoCardProps {
  numberOfItems: number
  variant?: 'default' | 'success'
  icon: LucideIcon
  label: string
}

export default function InfoCard({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) {
  return (
    <div className="rounded-md flex items-center gap-x-2 p-3"
    style={{ border: '1px solid rgba(255, 255, 255, 0.525)' }}
    >
      <IconBadge icon={Icon} variant={variant} />
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-white text-sm">
          {numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}
        </p>
      </div>
    </div>
  )
}
