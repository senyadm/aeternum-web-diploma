'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import * as z from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  File,
  ImageIcon,
  Loader,
  Loader2,
  PencilIcon,
  PlusCircle,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { Attachment, Course } from '@prisma/client'
import FileUpload from '@/components/FileUpload'

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] }
  courseId: string
}

const formSchema = z.object({
  url: z.string().min(1),
})

export default function AttachmentForm({
  initialData,
  courseId,
}: AttachmentFormProps) {
  const [isEdditing, setIsEdditing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values)
      toast.success('Course updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success('Course updated. Attachment removed.')
      router.refresh()
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setDeletingId(null)
    }
  }

  const toggleEdit = () => setIsEdditing((prev) => !prev)

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 text-black">
      <div className="font-medium flex items-center justify-between">
        Course resources
        <Button onClick={toggleEdit} variant="ghost">
          {isEdditing && <>Cancel</>}
          {!isEdditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add resources
            </>
          )}
        </Button>
      </div>
      {!isEdditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <>
                  <div
                    key={attachment.id}
                    className="flex  items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                  >
                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className="text-xs line-clamp-1">{attachment.name}</p>
                    {deletingId === attachment.id && (
                      <div className="ml-auto">
                        <Loader2 className="h-4 w-4  animate-spin" />
                      </div>
                    )}
                    {deletingId !== attachment.id && (
                      <button
                        onClick={() => onDelete(attachment.id)}
                        className="ml-auto hover:opacity-75 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </>
              ))}
            </div>
          )}
        </>
      )}
      {isEdditing && (
        <div>
          <FileUpload
            endpoint="courseAttachments"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything that can help your students
          </div>
        </div>
      )}
    </div>
  )
}
