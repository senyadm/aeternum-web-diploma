import prisma from '@/lib/db'
import React from 'react'
import Categories from './_components/Categories'
import SearchInput from '@/components/SearchInput'
import getCourses from '@/actions/getCourses'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import CoursesList from '@/components/CoursesList'

interface SearchPageProps {
  searchParams: {
    title: string
    categoryId: string
  }
}

export default async function page({ searchParams }: SearchPageProps) {
  const { userId } = auth()

  if (!userId) return redirect('/academy')

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const courses = await getCourses({
    userId,
    ...searchParams,
  })

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses}/>
      </div>
    </>
  )
}
