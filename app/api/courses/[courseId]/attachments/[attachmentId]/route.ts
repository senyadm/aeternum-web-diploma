import prisma from '@/lib/db'
import isTeacher from '@/lib/teacher';
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string; attachmentId: string }
  },
) {
  try {
    const { userId } = auth()
    if (!userId || !isTeacher(userId)) return new NextResponse('Unauthorized', { status: 401 })
    const courseOwner = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId as string,
      },
    })
    if (!courseOwner) return new NextResponse('Unauthorized', { status: 401 })
    if (!params.attachmentId)
      return new NextResponse('Attachment not found', { status: 404 })
    const attachment = await prisma.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    })
    return NextResponse.json(attachment)
  } catch (error) {
    console.log('ATTACHMENT_DELETE_ERROR', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
