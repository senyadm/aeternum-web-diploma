import React from 'react'
import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import IconBadge from '@/components/IconBadge'
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from 'lucide-react'
import TitleForm from './_components/TitleForm'
import DescriptionForm from './_components/DescriptionForm'
import ImageForm from './_components/ImageForm'
import CategoryForm from './_components/CategoryForm'
import PriceForm from './_components/PriceForm'
import AttachmentForm from './_components/AttachmentForm'
import ChaptersForm from './_components/ChaptersForm'
import Banner from '@/components/Banner'
import Actions from './_components/Actions'

export default async function page({
  params,
}: {
  params: { courseId: string }
}) {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      chapters: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  console.log(categories)

  const requiredFields = [
    course?.title,
    course?.description,
    course?.imageUrl,
    course?.price,
    course?.categoryId,
    course?.chapters.some((chapter) => chapter.isPublished),
  ]

  const total = requiredFields.length
  const complettedFields = requiredFields.filter(Boolean).length
  const completionText = `(${complettedFields}/${total})`
  const isCompleted = requiredFields.every(Boolean)

  if (!course) return redirect('/')
  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is not published yet. It will not be visible to students until you publish it." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-3xl font-medium text-white">Course Setup</h1>
            <span className="text-sm text-slate-400">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isCompleted}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl text-white">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl text-white">Course chapters</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl text-white">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl text-white">
                  Course Resources & Attachments
                </h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
