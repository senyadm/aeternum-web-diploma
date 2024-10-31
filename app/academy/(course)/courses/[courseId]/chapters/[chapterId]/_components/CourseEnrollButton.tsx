'use client'

import { Button } from '@/components/ui/button'
import formatPrice from '@/lib/format'
import axios from 'axios'
import React from 'react'
import { toast } from 'sonner'

interface CourseEnrollButtonProps {
  price: number
  courseId: string
}

export default function CourseEnrollButton({
  price,
  courseId,
}: CourseEnrollButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const onClick = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post(`/api/courses/${courseId}/checkout`)
      window.location.assign(res.data.url)
    } catch (error) {
      toast.error('Failed to enroll', { duration: 5000 })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  )
}
