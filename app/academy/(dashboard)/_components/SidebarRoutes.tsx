'use client'

import { BarChart, Compass, LayoutIcon, List } from 'lucide-react'
import SidebarItem from './SidebarItem'
import { usePathname } from 'next/navigation'

const guestRoutes = [
  {
    icon: LayoutIcon,
    label: 'Dashboard',
    href: '/academy',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/academy/search',
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/academy/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/academy/teacher/analytics',
  },
]

export default function SidebarRoutes() {
  const pathname = usePathname()
  const isTeacherPage = pathname?.includes('/teacher')

  const routes = isTeacherPage ? teacherRoutes : guestRoutes

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
