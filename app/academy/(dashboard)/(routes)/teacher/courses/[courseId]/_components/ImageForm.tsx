'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import * as z from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ImageIcon, PencilIcon, PlusCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Course } from '@prisma/client'
import FileUpload from '@/components/FileUpload'

interface ImageFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: 'Description is required' }),
})

export default function ImageForm({ initialData, courseId }: ImageFormProps) {
  const [isEdditing, setIsEdditing] = useState(false)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success('Course updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const toggleEdit = () => setIsEdditing((prev) => !prev)

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 text-black">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEdditing && <>Cancel</>}
          {!isEdditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEdditing && initialData.imageUrl && (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEdditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEdditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  )
}
