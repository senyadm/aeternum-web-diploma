import prisma from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function CourseIdPage({
  params,
}: {
  params: { courseId: string }
}) {
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  if (!course) return redirect('/academy')

  return redirect(`/academy/courses/${course.id}/chapters/${course.chapters[0].id}`)
}
