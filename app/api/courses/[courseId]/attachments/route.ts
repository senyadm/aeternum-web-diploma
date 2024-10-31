import prisma from '@/lib/db'
import isTeacher from '@/lib/teacher'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth()
    const { url } = await req.json()

    if (!userId || !isTeacher(userId)) return new NextResponse('Unauthorized', { status: 401 })

    const courseOwner = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    })

    if (!courseOwner) return new NextResponse('Unauthorized', { status: 401 })

    const attachment = await prisma.attachment.create({
      data: {
        url,
        name: url.split('/').pop(),
        courseId: params.courseId,
      },
    })

    return NextResponse.json(attachment)
  } catch (error) {
    console.log('[COURSE_ATTACHMENT_POST_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
