import prisma from '@/lib/db'
import { Category, Chapter, Course } from '@prisma/client'
import getProgress from './getProgress'

type CourseWithProgressWithCategory = Course & {
  category: Category
  chapters: Chapter[]
  progress: number | null
}

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[]
  coursesInProgress: CourseWithProgressWithCategory[]
}

export default async function getDashboardCourses(
  userId: string,
): Promise<DashboardCourses> {
  try {
    const purchasedCourses = await prisma.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    })

    const courses = purchasedCourses.map(
      (purchase) => purchase.course,
    ) as CourseWithProgressWithCategory[]

    for (let course of courses) {
      const progress = await getProgress(userId, course.id)
      course['progress'] = progress
    }

    const completedCourses = courses.filter((course) => course.progress === 100)
    const coursesInProgress = courses.filter(
      (course) => course.progress !== 100,
    )

    return {
      completedCourses,
      coursesInProgress,
    }
  } catch (error) {
    console.log(error)
    return {
      completedCourses: [],
      coursesInProgress: [],
    }
  }
}
