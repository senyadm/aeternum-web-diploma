import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import Mux from '@mux/mux-node'

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const courseOwner = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if (!courseOwner) return new NextResponse('Unauthorized', { status: 401 })

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    })

    if (!chapter) return new NextResponse('Not found', { status: 404 })

    if (chapter.videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      })
      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId)
        await prisma.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        })
      }
    }

    const deletedChapter = await prisma.chapter.delete({
      where: {
        id: params.chapterId,
      },
    })

    const publishedChaptersInCourse = await prisma.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    })

    if (!publishedChaptersInCourse.length) {
      await prisma.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      })
    }

    return NextResponse.json(deletedChapter)
  } catch (error) {
    console.log('[CHAPTER_ID_DELETE]', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = await auth()
    const { isPublished, ...values } = await req.json()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    const owner = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })
    if (!owner) return new NextResponse('Unauthorized', { status: 401 })

    const chapter = await prisma.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    })

    if (values.videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      })

      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId)
        await prisma.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        })
      }

      const asset = await mux.video.assets.create({
        input: values.videoUrl,
        playback_policy: ['public'],
        test: false,
      })

      await prisma.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0].id,
        },
      })
    }

    return NextResponse.json(chapter)
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 })
  }
}
