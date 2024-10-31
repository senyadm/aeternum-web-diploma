import prisma from '@/lib/db'
import { Attachment, Chapter } from '@prisma/client'

interface GetChapterProps {
  userId: string
  courseId: string
  chapterId: string
}

export default async function getChapters({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          courseId,
          userId,
        },
      },
    })

    const course = await prisma.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    })

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    })

    if (!chapter || !course) {
      throw new Error('Chapter or course not found')
    }

    let muxData = null
    let attachments: Attachment[] = []
    let nextChapter: Chapter | null = null

    if (purchase) {
      attachments = await prisma.attachment.findMany({
        where: {
          courseId,
        },
      })
    }

    if (chapter.isFree || purchase) {
      muxData = await prisma.muxData.findUnique({
        where: {
          chapterId,
        },
      })

      nextChapter = await prisma.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: 'asc',
        },
      })
    }

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    })

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    }
  } catch (error) {
    console.log(error)
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: null,
      nextChapter: null,
      userProgress: null,
      purchase: null,
    }
  }
}
