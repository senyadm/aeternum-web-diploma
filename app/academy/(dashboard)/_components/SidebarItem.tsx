'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

export default function SidebarItem({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isActive =
    (pathname === '/academy' && href === '/academy') ||
    pathname === href ||
    pathname?.startsWith(`/academy/${href}/`)

  const onClick = () => {
    router.push(href)
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-center gap-x-2 text-white text-sm font-[500] pl-6 transition-all hover:text-white-200 hover:bg-slate-300/20',
        isActive &&
          'text-white/90 bg-white/20 hover:bg-white/25 hover:text-white/90',
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size="22"
          className={cn('text-white/90', isActive && 'text-white')}
        />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto opacity-0 border-2 border-sky-700 h-full transition-all',
          isActive && 'opacity-100',
        )}
      />
    </button>
  )
}
