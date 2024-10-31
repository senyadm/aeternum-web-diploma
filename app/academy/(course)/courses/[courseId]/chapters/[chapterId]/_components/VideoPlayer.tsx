'use client'

import React, { useState } from 'react'
import axios from 'axios'
import MuxPlayer from '@mux/mux-player-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useConfettiStore } from '@/hooks/useConfettiStore'

interface VideoPlayerProps {
  playbackId: string
  courseId: string
  chapterId: string
  nextChapterId?: string
  isLocked: boolean
  completedOnEnd: boolean
  title: string
}

export default function VideoPlayer({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  title,
  completedOnEnd,
}: VideoPlayerProps) {
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()
  const confetti = useConfettiStore()

  const onEnd = async () => {
    try {
      if (completedOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          },
        )
        if (!nextChapterId) {
          confetti.onOpen()
        }
        toast.success('Progress updated')
        router.refresh()
        if (nextChapterId)
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="relative aspect-video">
      {!isLocked && !isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked.</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn('', !isReady && 'hidden')}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          playbackId={playbackId}
          autoPlay
        />
      )}
    </div>
  )
}
