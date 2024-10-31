import { Category, Course } from '@prisma/client'
import getProgress from './getProgress'
import prisma from '@/lib/db'

type CourseWithProgressWithCategory = Course & {
  category: Category | null
  chapters: { id: string }[]
  progress: number | null
}

type GetCourses = {
  userId: string
  title?: string
  categoryId?: string
}

export default async function getCourses({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            }
          }
          const progresPercentage = await getProgress(userId, course?.id)
          return {
            ...course,
            progress: progresPercentage,
          }
        }),
      )
    return coursesWithProgress
  } catch (error) {
    console.log('[GET_COURSES]', error)
    return []
  }
}
