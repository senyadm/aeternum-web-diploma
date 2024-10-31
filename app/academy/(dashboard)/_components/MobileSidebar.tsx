import { Menu } from 'lucide-react'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Sidebar from './Sidebar'

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="md:hidden pr-4 hover:opacity-75 transition"
      >
        <Menu size={40} />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
