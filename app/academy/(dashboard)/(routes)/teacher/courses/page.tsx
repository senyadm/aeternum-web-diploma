import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'

export default async function page() {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const courses = await prisma.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  )
}
