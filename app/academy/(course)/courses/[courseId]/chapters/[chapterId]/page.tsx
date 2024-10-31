import getChapters from '@/actions/getChapters'
import Banner from '@/components/Banner'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import VideoPlayer from './_components/VideoPlayer'
import CourseEnrollButton from './_components/CourseEnrollButton'
import { Separator } from '@/components/ui/separator'
import { Preview } from '@/components/preview'
import Link from 'next/link'
import { FileIcon } from 'lucide-react'
import CourseProgressButton from './_components/CourseProgressButton'

export default async function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapters({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  })

  if (!chapter || !course) return redirect('/')

  const isLocked = !chapter.isFree && !purchase
  const completedOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completedOnEnd={completedOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl text-white font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id!}
                isCompleted={userProgress?.isCompleted!}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4 flex flex-col gap-y-2">
                {attachments.map((attachment) => (
                  <Link
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <FileIcon />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
