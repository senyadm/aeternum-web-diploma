'use client'

import ConfirmModal from '@/components/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface ChapterActionsProps {
  disabled: boolean
  courseId: string
  chapterId: string
  isPublished: boolean
}

export default function ChapterActions({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onClick = async () => {
    try {
      setIsLoading(true)
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
        toast.success('Chapter unpublished successfully')
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
        toast.success('Chapter published successfully')
      }
      router.refresh()
    } catch (error) {
      toast.error('Failed to publish chapter')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
      toast.success('Chapter deleted successfully')
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    } catch (error) {
      toast.error('Failed to delete chapter')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        onClick={onClick}
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}
