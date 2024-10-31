'use client'

import { useAuth, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import SearchInput from './SearchInput'
import isTeacher from '@/lib/teacher'

export default function NavbarRoutes() {
  const { userId } = useAuth()
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/academy/teacher')
  const isPlayerPage = pathname?.includes('/academy/courses')
  const isSearchPage = pathname === '/academy/search'

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex items-center text-white gap-x-2 ml-auto ">
        <Link href="/">
          <Button className="bg-white/0 hover:bg-white/0" size="sm">
            Home
          </Button>
        </Link>
        {isTeacherPage || isPlayerPage ? (
          <Link href="/academy">
            <Button className="bg-white/0 hover:bg-white/0" size="sm">
              <LogOut className="h-4 w-4 mr-2" /> Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/academy/teacher/courses">
            <Button className="bg-white/0 hover:bg-white/0" size="sm">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <w3m-button />
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  )
}
