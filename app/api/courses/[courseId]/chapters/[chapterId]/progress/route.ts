import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { couseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth()
    const { isCompleted } = await req.json()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const userProgress = await prisma.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: userId as string,
          chapterId: params.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId: userId as string,
        chapterId: params.chapterId,
        isCompleted,
      },
    })

    return NextResponse.json(userProgress)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
