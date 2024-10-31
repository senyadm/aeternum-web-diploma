import prisma from '@/lib/db'

export default async function getProgress(
  userId: string,
  courseId: string,
): Promise<number> {
  try {
    const publishedChapters = await prisma.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    })

    const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id)

    const validCompletedChapters = await prisma.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChaptersIds,
        },
        isCompleted: true,
      },
    })

    const progress =
      (validCompletedChapters / publishedChaptersIds.length) * 100

    return progress
  } catch (error) {
    console.log('[GET_PROGRESS]', error)
    return 0
  }
}
