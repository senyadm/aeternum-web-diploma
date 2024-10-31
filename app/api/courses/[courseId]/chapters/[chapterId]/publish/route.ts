import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const ownCourse = prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if (!ownCourse) return new NextResponse('Unauthorized', { status: 401 })

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    })
    const muxData = await prisma.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    })

    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      return new NextResponse('Missing required states', { status: 400 })
    }

    const publishedChapter = await prisma.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    })

    return NextResponse.json(publishedChapter)
  } catch (error) {
    console.log('CHAPTER_PUBLISH_ERROR: Failed to publish chapter')
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}