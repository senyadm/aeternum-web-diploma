'use client'

import ConfirmModal from '@/components/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/useConfettiStore'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
  disabled: boolean
  courseId: string
  isPublished: boolean
}

export default function Actions({
  disabled,
  courseId,
  isPublished,
}: ActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const confetti = useConfettiStore()

  const onClick = async () => {
    try {
      setIsLoading(true)
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success('Course unpublished successfully')
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success('Course published successfully')
        confetti.onOpen()
      }
      router.refresh()
    } catch (error) {
      toast.error('Failed to publish course')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/courses/${courseId}`)
      toast.success('Course deleted successfully')
      router.refresh()
      router.push(`/teacher/courses`)
    } catch (error) {
      toast.error('Failed to delete course')
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
