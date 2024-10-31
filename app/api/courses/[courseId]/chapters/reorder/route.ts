import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { list } = await req.json()

    const owner = await prisma.course.findFirst({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if (!owner) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    for (let item of list) {
      await prisma.chapter.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      })
    }

    return new NextResponse('Success', { status: 200 })
  } catch (error) {
    console.log('[REORDER CHAPTERS ERROR]', error)

    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
