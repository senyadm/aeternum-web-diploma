import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })
    if (!course) return new NextResponse('Not found', { status: 404 })

    const unpublishedCourse = await prisma.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    })

    return NextResponse.json(unpublishedCourse)
  } catch (error) {
    console.log('[COURSE_ID_PATCH]', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
