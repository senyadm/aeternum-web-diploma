'use client'


import { OurFileRouter } from '@/app/api/uploadthing/core'
import { UploadDropzone } from '@/lib/uploadthing'
import { toast } from 'sonner'

interface FileUploadProps {
  onChange: (url: string) => void
  endpoint: keyof OurFileRouter
}

export default function FileUpload({ onChange, endpoint }: FileUploadProps) {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(err: Error) => {
        toast.error(`${err?.message}`)
      }}
    />
  )
}
